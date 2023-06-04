const bcrypt = require('bcryptjs');

function hashPassword(plain) {
  return bcrypt.hashSync(plain, 10);
}

function comparePassword(plain, hash) {
  return bcrypt.compareSync(hash, plain);
}

module.exports = {
  hashPassword,
  comparePassword
}