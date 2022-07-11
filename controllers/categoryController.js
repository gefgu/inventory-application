const Category = require("../models/category");
const async = require("async");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");

exports.category_list = (req, res, next) => {
  Category.find({}, "name")
    .sort({ name: 1 })
    .exec((err, category_list) => {
      if (err) return next(err);
      res.render("category_list", {
        title: "Categories",
        category_list: category_list,
      });
    });
};

exports.category_detail = (req, res, next) => {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) return next(err);
    if (category === null) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
    res.render("category_detail", { title: category.name, category: category });
  });
};

exports.category_create_get = (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
    category: undefined,
    errors: undefined,
  });
};

exports.category_create_post = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      category.save(function (err) {
        if (err) return next(err);

        res.redirect(category.url);
      });
    }
  },
];

exports.category_delete_get = (req, res, next) => {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_items: function (callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.category === null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }

      res.render("category_delete", {
        title: `Delete Category: ${results.category.name}`,
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};

exports.category_delete_post = (req, res, next) => {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_items: function (callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.category_items.length > 0) {
        res.render("category_delete", {
          title: `Delete Category: ${results.category.name}`,
          category: results.category,
          category_items: results.category_items,
        });
        return;
      } else {
        Category.findByIdAndRemove(req.body.categoryid, function (err) {
          if (err) return next(err);
          res.redirect("/categories");
        });
      }
    }
  );
};

exports.category_update_get = (req, res, next) => {
  Category.findById(req.params.id, function (err, category) {
    res.render("category_form", {
      title: "Update Category",
      category: category,
      errors: undefined,
    });
  });
};

exports.category_update_post = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Update Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      Category.findByIdAndUpdate(req.params.id, category, {}, function (err) {
        if (err) return next(err);

        res.redirect(category.url);
      });
    }
  },
];
