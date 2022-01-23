const { Op } = require('sequelize');
const { BlogPosts, Categories, Users } = require('../models');
const validate = require('../middlewares/postsValidation');

const errors = {
  wrongId: { status: 404, message: 'User does not exist' },
  emailExists: { status: 409, message: 'User already registered' },
  categoryIdNotFound: { status: 400, message: '"categoryIds" not found' },
};

const checkCategoryId = async (categoryId) => {
  const result = await Categories.findAll({ where: { id: { [Op.in]: categoryId } } });
  if (result.length !== categoryId.length) throw errors.categoryIdNotFound;
  return result;
};

const createPostService = async (newPostInfo) => {
  const { title, categoryIds, content, id: userId } = newPostInfo;

  validate.isValidTitle(title);
  validate.isValidContent(content);
  validate.isValidCategoryId(categoryIds);

  await checkCategoryId(categoryIds);

  const { dataValues } = await BlogPosts.create({ title, content, userId });

  return dataValues;
};

const listPostService = async () => {
  const allPosts = await BlogPosts.findAll({ include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } }],
  });

  return allPosts;
};

const getPostByIdService = async (id) => {
  const userID = await BlogPosts.findByPk(id);
  if (!userID) throw errors.wrongId;
  return userID;
};

module.exports = { createPostService, listPostService, getPostByIdService }; 
