const service = require('../services/serviceUser');

const createUserController = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const result = await service.createUserService({ displayName, email, password, image });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const listUserController = async (req, res, next) => {
  try {
    const result = await service.listUserService();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getUserByIdService(id);
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// const removeUserController = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await service.removeUser({ id });

//     return res.status(204).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = { 
  createUserController, listUserController, getUserByIdController }; 