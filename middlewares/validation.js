const errors = {
  displayErr: { status: 400, message: '"displayName" lenght must be at least 8 characters long' },
  emailFormat: { status: 400, message: '"email" must be a valid email' },
  emailEmpty: { status: 400, message: '"email" is required' },
  passwordLeght: { status: 400, message: '"password" lenght must be at least 6 characters long' },
  passwordEmpty: { status: 400, message: '"password" is required' },
};

const isValidDisplayName = (displayName) => {
  const minLenght = 8;
  if (displayName.lenght >= minLenght) throw errors.displayErr;
};

const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (email == null) throw errors.emailEmpty;
  if (!regex.test(email)) throw errors.emailFormat;
};

const isValidPassword = (password) => {
  const passwordLenght = 6;
  if (password == null) throw errors.passwordEmpty;
  if (password.lenght === passwordLenght) throw errors.passwordLeght;
};

module.exports = { isValidDisplayName, isValidEmail, isValidPassword };