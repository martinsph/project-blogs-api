const errors = {
  emailEmpty: { status: 400, message: '"email" is not allowed to be empty' },
  emailRequired: { status: 400, message: '"email" is required' },
  passwordEmpty: { status: 400, message: '"password" is not allowed to be empty' },
  passwordRequired: { status: 400, message: '"password" is required' },
};

const isValidEmail = (email) => {
  if (email == null) throw errors.emailRequired;
  if (email === '') throw errors.emailEmpty;
};

const isValidPassword = (password) => {
  if (password == null) throw errors.passwordRequired;
  if (password === '') throw errors.passwordEmpty;
};

module.exports = { isValidEmail, isValidPassword };