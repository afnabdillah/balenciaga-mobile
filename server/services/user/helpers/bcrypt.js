const bcrypt = require("bcrypt");

function hashPassword(plain) {
  return bcrypt.hashSync(plain, 10);
}

function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}

module.exports = {
  hashPassword,
  comparePassword
}