const { sequelize } = require("../models/index");
const { User } = require("../models");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const newUser = await User.create(req.body, { transaction: t });
      await t.commit();
      res.status(201).json(newUser);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmptyLoginInput" };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "InvalidLoginInput" };
      }
      const access_token = createToken({
        id: user.id,
        email: user.email,
      });
      res.status(201).json({
        access_token,
        username: user.username,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
