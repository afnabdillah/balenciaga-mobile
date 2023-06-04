const {verifyToken} = require('../helpers/jwt');
const {User} = require('../models');

async function adminAuth(req, res, next) {
  try {
    const {access_token} = req.headers;
    if (!access_token) {
      throw {name : 'InvalidToken'}
    }
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name : 'InvalidToken'}
    }
    if (user.role !== 'admin') {
      throw {name : 'Forbidden'}
    }
    req.user = user;
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = adminAuth;