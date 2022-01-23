const errors = {
  titleRequired: { status: 400, message: '"title" is required' },
  contentRequired: { status: 400, message: '"content" is required' },
  categoryIdRequired: { status: 400, message: '"categoryIds" is required' },
};

const isValidTitle = (title) => {
  if (!title) throw errors.titleRequired;
};

const isValidContent = (content) => {
  if (!content) throw errors.contentRequired;
};

const isValidCategoryId = (categoryId) => {
  if (!categoryId) throw errors.categoryIdRequired;
};

module.exports = { isValidTitle, isValidContent, isValidCategoryId };