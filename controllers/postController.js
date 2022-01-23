const service = require('../services/servicePost');

const createPostController = async (req, res, next) => {
  try {
    const { title, categoryIds, content } = req.body;
    const { id } = req.user;
    const result = await service.createPostService({ title, categoryIds, content, id });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const listPostController = async (req, res, next) => {
  try {
    const result = await service.listPostService();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getPostByIdService(id);
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updatePostController = async (req, res, next) => {
  try {
    const { title, content, categoryIds = [] } = req.body;
    const { id } = req.params;
    // passa id para userId
    const { id: userId } = req.user;
    const result = await service.updatePostService({ title, content, categoryIds, id, userId });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// const removePostController = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await service.removeUser(id);

//     return res.status(204).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = { 
  createPostController, listPostController, getPostByIdController, updatePostController }; 