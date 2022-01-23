const { Op } = require('sequelize');
const { BlogPosts, Categories, User } = require('../models');
const validatePost = require('../middlewares/postsValidation');
const validadteUpdate = require('../middlewares/postUpdateValidation');

const errors = {
  postNotExist: { status: 404, message: 'Post does not exist' },
  categoryIdNotFound: { status: 400, message: '"categoryIds" not found' },
  categoryEdition: { status: 400, message: 'Categories cannot be edited' },
  unauthorizedUser: { status: 401, message: 'Unauthorized user' },
};

const checkCategoryId = async (categoryId) => {
  const result = await Categories.findAll({ where: { id: { [Op.in]: categoryId } } });
  if (result.length !== categoryId.length) throw errors.categoryIdNotFound;
  return result;
};

const createPostService = async (newPostInfo) => {
  const { title, categoryIds, content, id: userId } = newPostInfo;

  validatePost.isValidTitle(title);
  validatePost.isValidContent(content);
  validatePost.isValidCategoryId(categoryIds);

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
  const postId = await BlogPosts.findByPk(id, { include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!postId) throw errors.postNotExist;
  return postId;
};

const updatePostService = async ({ title, content, categoryIds, userId, id }) => {
  validadteUpdate.isValidTitle(title);
  validadteUpdate.isValidContent(content);

  if (categoryIds.length > 0) throw errors.categoryEdition;

  const postId = await BlogPosts.findByPk(id, { include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] });

  if (postId.userId !== userId) throw errors.unauthorizedUser;
  
  await BlogPosts.update({ title, content, userId }, { where: { id } });

  const updatedId = await BlogPosts.findByPk(id, { include: [
    { model: User, as: 'user' }, 
    { model: Categories, as: 'categories', through: { attributes: [] } }],
  });
  return updatedId;
};

module.exports = { createPostService, listPostService, getPostByIdService, updatePostService }; 
