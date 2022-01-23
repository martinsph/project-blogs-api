const express = require('express');
const { jwtDecode } = require('../../middlewares/authentication');
const { 
  createPostController, 
  listPostController, 
  getPostByIdController,
  updatePostController,
} = require('../postController');

const postRouter = express.Router({ mergeParams: true });

postRouter.post('/', jwtDecode, createPostController);
postRouter.get('/', jwtDecode, listPostController);
postRouter.get('/:id', jwtDecode, getPostByIdController);
postRouter.put('/:id', jwtDecode, updatePostController);

module.exports = postRouter;
