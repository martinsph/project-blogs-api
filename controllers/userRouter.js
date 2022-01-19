const express = require('express');
const { 
  createUserController, listUserController, getUserByIdController } = require('./userController');

const router = express.Router({ mergeParams: true });

router.post('/', createUserController);
router.get('/', listUserController);
router.get('/:id', getUserByIdController);

module.exports = router;
