const jwt = require('jsonwebtoken');

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_KEY);
}

module.exports = {
  createToken,
  verifyToken
}