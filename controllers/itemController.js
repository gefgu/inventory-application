const Item = require("../models/item");
const Category = require("../models/category");

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
  res.send("Not Implemented");
};

exports.item_create_get = (req, res, next) => {
  res.send("Not Implemented");
};

exports.item_create_post = (req, res, next) => {
  res.send("Not Implemented");
};

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
