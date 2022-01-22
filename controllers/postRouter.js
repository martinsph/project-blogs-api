const express = require('express');
const { jwtDecode } = require('../middlewares/authentication');
const { 
  createPostController, 
  listPostController, 
  getPostByIdController,
} = require('./postController');

const postRouter = express.Router({ mergeParams: true });

postRouter.post('/', createPostController);
postRouter.get('/', jwtDecode, listPostController);
postRouter.get('/:id', jwtDecode, getPostByIdController);

module.exports = postRouter;
