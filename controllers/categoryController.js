const Category = require("../models/category");

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
  Category.findById(req.params.id)
    .exec((err, category) => {
      if (err) return next(err);
      res.render("category_detail", { title: category.name, category: category });
    });
};

exports.category_create_get = (req, res, next) => {
  res.send("Not Implemented");
};

exports.category_create_post = (req, res, next) => {
  res.send("Not Implemented");
};

exports.category_delete_get = (req, res, next) => {
  res.send("Not Implemented");
};

exports.category_delete_post = (req, res, next) => {
  res.send("Not Implemented");
};

exports.category_update_get = (req, res, next) => {
  res.send("Not Implemented");
};

exports.category_update_post = (req, res, next) => {
  res.send("Not Implemented");
};
