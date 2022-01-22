const service = require('../services/serviceCategories');

const createCategoriesController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await service.createCategoryService({ name });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const listCategoriesController = async (req, res, next) => {
  try {
    const result = await service.listCategoriesService();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { createCategoriesController, listCategoriesController };
