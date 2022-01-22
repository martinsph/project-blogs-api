const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const JWT_OPTIONS = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const jwtSign = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const jwtDecode = (req, _res, next) => {
  const { authorization } = req.headers;
  
  const errors = {
    missingToken: { status: 401, message: 'Token not found' },
    invalidToken: { status: 401, message: 'Expired or invalid token' },
  };
  
  if (!authorization) throw errors.missingToken;
  
  try {
    const decoded = jwt.verify(authorization, JWT_SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    throw errors.invalidToken;
  }
};

module.exports = {
  jwtSign,
  jwtDecode,
};