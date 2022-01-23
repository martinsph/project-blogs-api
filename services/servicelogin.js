const { User } = require('../models');
const validate = require('../middlewares/loginValidation');
const { jwtSign } = require('../middlewares/authentication');

const errors = {
  invalidFields: { status: 400, message: 'Invalid fields' },
};

const getUserByEmailService = async (email) => {
  const userEmail = await User.findOne({ where: { email } });
  if (!userEmail) throw errors.invalidFields;
  return userEmail;
};

const loginService = async (loginInfo) => {
  const { email, password } = loginInfo;

  validate.isValidEmail(email);
  validate.isValidPassword(password);
  const { id } = await getUserByEmailService(email);

  const token = jwtSign({ email, password, id });

  return { token };
};

module.exports = loginService; 
