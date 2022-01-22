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

const jwtDecode = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

module.exports = {
  jwtSign,
  jwtDecode,
};