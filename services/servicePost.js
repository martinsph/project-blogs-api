const { Op } = require('sequelize');
const { BlogPosts, Categories, User } = require('../models');
const validate = require('../middlewares/postsValidation');

const errors = {
  postNotExist: { status: 404, message: 'Post does not exist' },
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
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } }],
  });

  return allPosts;
};

const getPostByIdService = async (id) => {
  const postID = await BlogPosts.findByPk(id, { include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!postID) throw errors.postNotExist;
  return postID;
};

module.exports = { createPostService, listPostService, getPostByIdService }; 
