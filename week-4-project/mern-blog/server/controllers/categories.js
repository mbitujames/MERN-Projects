const Category = require('../models/category');
const { BadRequestError } = require('../utils/errors');

// Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// Create new category (admin only)
exports.createCategory = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new BadRequestError('Not authorized to create categories');
    }

    const { name, description } = req.body;
    if (!name) throw new BadRequestError('Category name is required');

    const category = new Category({ name, description });
    await category.save();
    
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};