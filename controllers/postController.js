const service = require('../services/servicePost');

const createPostController = async (req, res, next) => {
  try {
    const { displayName, email, password, image = '' } = req.body;

    const result = await service.createPostService({ displayName, email, password, image });
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
  createPostController, listPostController, getPostByIdController }; 