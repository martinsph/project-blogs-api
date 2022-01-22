const { User } = require('../models');
const validate = require('../middlewares/validation');
const { jwtSign } = require('../middlewares/authentication');

const errors = {
  wrongId: { status: 404, message: 'User does not exist' },
  emailExists: { status: 409, message: 'User already registered' },
};

const getUserByEmailService = async (email) => {
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) throw errors.emailExists;
  return userEmail;
};

const createUserService = async (newUserInfo) => {
  const { displayName, email, password, image } = newUserInfo;

  validate.isValidDisplayName(displayName);
  validate.isValidEmail(email);
  validate.isValidPassword(password);
  await getUserByEmailService(email);

  const { dataValues: { id } } = await User.create({ displayName, email, password, image });

  const token = jwtSign({ id, email });

  return token;
};

const listUserService = async () => {
  const allUsers = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return allUsers;
};

const getUserByIdService = async (id) => {
  const userID = await User.findByPk(id);
  if (!userID) throw errors.wrongId;
  return userID;
};

module.exports = { createUserService, listUserService, getUserByIdService }; 
