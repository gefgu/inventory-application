const Item = require("../models/item");
const Category = require("../models/category");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.item_list = (req, res, next) => {
  Item.find({}, "name category")
    .sort({ name: 1 })
    .populate("category")
    .exec((err, item_list) => {
      if (err) return next(err);
      res.render("item_list", { title: "Items List", item_list: item_list });
    });
};

exports.item_detail = (req, res, next) => {
  Item.findById(req.params.id)
    .populate("category")
    .exec((err, item) => {
      if (err) return next(err);
      res.render("item_detail", { title: item.name, item: item });
    });
};

exports.item_create_get = (req, res, next) => {
  Category.find({}, "name")
    .sort({ name: 1 })
    .exec((err, category_list) => {
      if (err) return next(err);
      res.render("item_form", {
        title: "Create Item",
        category_list: category_list,
        item: undefined,
        errors: undefined,
      });
    });
};

exports.item_create_post = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("category", "Category must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock", "Number in Stock must be a positive number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isInt({ min: 0 }),
  body("price", "Price must be a positive number")
    .trim()
    .isLength({ min: 1 })
    .isFloat({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      numberInStock: req.body.stock,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      Category.find({}, "name")
        .sort({ name: 1 })
        .exec((err, category_list) => {
          if (err) return next(err);
          res.render("item_form", {
            title: "Create Item",
            category_list: category_list,
            item: item,
            errors: errors.array(),
          });
        });
    } else {
      item.save(function (err) {
        if (err) return next(err);

        res.redirect(item.url);
      });
    }
  },
];

exports.item_delete_get = (req, res, next) => {
  res.send("Not Implemented");
};

exports.item_delete_post = (req, res, next) => {
  res.send("Not Implemented");
};

exports.item_update_get = (req, res, next) => {
  res.send("Not Implemented");
};

exports.item_update_post = (req, res, next) => {
  res.send("Not Implemented");
};
