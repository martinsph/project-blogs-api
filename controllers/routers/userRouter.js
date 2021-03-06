const express = require('express');
const { jwtDecode } = require('../../middlewares/authentication');
const { 
  createUserController, 
  listUserController, 
  getUserByIdController,
  removeUserController,
} = require('../userController');

const userRouter = express.Router({ mergeParams: true });

userRouter.post('/', createUserController);
userRouter.get('/', jwtDecode, listUserController);
userRouter.get('/:id', jwtDecode, getUserByIdController);
userRouter.delete('/:id', jwtDecode, removeUserController);

module.exports = userRouter;
