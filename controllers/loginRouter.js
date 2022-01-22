const express = require('express');
const loginController = require('./loginController');

const loginRouter = express.Router({ mergeParams: true });

loginRouter.post('/', loginController);

module.exports = loginRouter;
