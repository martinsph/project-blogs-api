const express = require('express');
const { 
  createCategoriesController, 
  listCategoriesController,
} = require('../categoriesController');
const { jwtDecode } = require('../../middlewares/authentication');

const categoriesRouter = express.Router({ mergeParams: true });

categoriesRouter.post('/', jwtDecode, createCategoriesController);
categoriesRouter.get('/', jwtDecode, listCategoriesController);

module.exports = categoriesRouter;