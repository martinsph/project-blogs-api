const errors = {
  nameRequired: { status: 400, message: '"name" is required' },
};

const isValidName = (name) => {
  if (name == null) throw errors.nameRequired;
};

module.exports = isValidName;
