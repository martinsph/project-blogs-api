const { BlogPosts } = require('../models');
const validate = require('../middlewares/postsValidation');
const { jwtSign } = require('../middlewares/authentication');

const errors = {
  wrongId: { status: 404, message: 'User does not exist' },
  emailExists: { status: 409, message: 'User already registered' },
  categoryIdNotFound: { status: 400, message: '"categoryId" not found' },
};

const checkCategoryId = async (categoryId) => {
  const result = await BlogPosts.findOne({ where: { categoryId } });
  if (result) throw errors.categoryIdNotFound;
  return result;
};

const createUserService = async (newUserInfo) => {
  const { title, categoryIds, content } = newUserInfo;

  validate.isValidTitle(title);
  validate.isValidContent(content);
  validate.isValidCategoryId(categoryIds);
  await checkCategoryId(categoryIds);

  const { dataValues } = await BlogPosts.create({ title, categoryIds, content });

  return dataValues;
};

const listUserService = async () => {
  const allUsers = await BlogPosts.findAll({ attributes: ['id', 'userId', 'title', 'content'] });
  return allUsers;
};

const getUserByIdService = async (id) => {
  const userID = await BlogPosts.findByPk(id);
  if (!userID) throw errors.wrongId;
  return userID;
};

module.exports = { createUserService, listUserService, getUserByIdService }; 
