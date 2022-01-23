const errors = {
  titleRequired: { status: 400, message: '"title" is required' },
  contentRequired: { status: 400, message: '"content" is required' },
};

const isValidTitle = (title) => {
  if (!title) throw errors.titleRequired;
};

const isValidContent = (content) => {
  if (!content) throw errors.contentRequired;
};

module.exports = { isValidTitle, isValidContent };