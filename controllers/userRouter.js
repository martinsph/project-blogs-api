const express = require('express');
const { 
  createUserController, 
  listUserController, 
  getUserByIdController,
} = require('./userController');

const userRouter = express.Router({ mergeParams: true });

userRouter.post('/', createUserController);
userRouter.get('/', listUserController);
userRouter.get('/:id', getUserByIdController);

module.exports = userRouter;
