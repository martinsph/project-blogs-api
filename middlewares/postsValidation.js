const errors = {
  titleRequired: { status: 400, message: '"title" is required' },
  contentRequired: { status: 400, message: '"content" is required' },
  categoryIdRequired: { status: 400, message: '"categoryId" is required' },
};

const isValidTitle = (title) => {
  if (!title) throw errors.titleRequired;
};

const isValidContent = (content) => {
  if (!content) throw errors.titleRequired;
};

const isValidCategoryId = (categoryId) => {
  if (!categoryId) throw errors.titleRequired;
};

module.exports = { isValidTitle, isValidContent, isValidCategoryId };