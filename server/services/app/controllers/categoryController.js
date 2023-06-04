const { Category } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryDetails(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async insertCategories(req, res, next) {
    try {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  static async editCategories(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (!category) {
        throw { name: "NotFound" };
      }
      await Category.update(req.body, { where: { id } });
      res.status(200).json({
        message : `Category id#${id} has been updated !!`
      })
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategories(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (!category) {
        throw { name: "NotFound" };
      }
      await Category.destroy({ where: { id } });
      res.status(200).json({
        message : `Delete category id#${id} success !!`
      })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
