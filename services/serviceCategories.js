const { Categories } = require('../models');
const validate = require('../middlewares/categoriesValidation');

const createCategoryService = async (newCategory) => {
  const { name } = newCategory;

  validate(name);

  const { dataValues } = await Categories.create({ name });

  return dataValues;
};

const listCategoriesService = async () => {
  const allCategories = await Categories.findAll({ 
    attributes: ['id', 'name'] });
  return allCategories;
};

module.exports = { createCategoryService, listCategoriesService }; 
