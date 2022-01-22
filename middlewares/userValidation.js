const errors = {
  displayErr: { status: 400, message: '"displayName" length must be at least 8 characters long' },
  emailFormat: { status: 400, message: '"email" must be a valid email' },
  emailEmpty: { status: 400, message: '"email" is required' },
  passwordLeght: { status: 400, message: '"password" length must be 6 characters long' },
  passwordEmpty: { status: 400, message: '"password" is required' },
};

const isValidDisplayName = (displayName) => {
  const minLength = 8;
  if (displayName.length < minLength) throw errors.displayErr;
};

const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (email == null) throw errors.emailEmpty;
  if (!regex.test(email)) throw errors.emailFormat;
};

const isValidPassword = (password) => {
  const passwordLength = 6;
  if (password == null) throw errors.passwordEmpty;
  if (password.length < passwordLength) throw errors.passwordLeght;
};

module.exports = { isValidDisplayName, isValidEmail, isValidPassword };