const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).jsaon({
        error: "Category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res, next) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "You are not ADMIN, Access Denied",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  req.category.createdAt = undefined;
  req.category.updatedAt = undefined;
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err || !items) {
      return res.status(400).json({ error: "No Categories found in DB" });
    }
    res.json(items);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err || !updatedCategory) {
      return res.status(400).json({ error: "Failed to upadte Category" });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err || !category) {
      return res
        .status(400)
        .json({ error: `Failed to remove Category ${category.name}` });
    }
    res.json({
      message: `Successfully deleted ${category.name}`,
    });
  });
};
