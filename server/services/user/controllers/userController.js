const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const User = require("../models/User");

class UserController {
  static async findAll(req, res, next) {
    try {
      let users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      req.body.password = hashPassword(req.body.password);
      const newUser = await User.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw { name: "NotFound" };
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await User.deleteById(id);
      if (response.deletedCount === 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
