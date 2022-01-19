const { jwtSign } = require('../middlewares/authentication');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = jwtSign({ email, password });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
};