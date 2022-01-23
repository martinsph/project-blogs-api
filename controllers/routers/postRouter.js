const express = require('express');
const { jwtDecode } = require('../../middlewares/authentication');
const { 
  createPostController, 
  listPostController, 
  getPostByIdController,
  updatePostController,
  removePostController,
} = require('../postController');

const postRouter = express.Router({ mergeParams: true });

postRouter.post('/', jwtDecode, createPostController);
postRouter.get('/', jwtDecode, listPostController);
postRouter.get('/:id', jwtDecode, getPostByIdController);
postRouter.put('/:id', jwtDecode, updatePostController);
postRouter.delete('/:id', jwtDecode, removePostController);

module.exports = postRouter;
