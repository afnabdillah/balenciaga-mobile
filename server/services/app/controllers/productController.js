const { Product, Category, Image, User, sequelize } = require("../models");
const { Op } = require("sequelize");

class ProductController {
  static async getProducts(req, res, next) {
    try {
      let { search, categoryName } = req.query;
      search = search ?? "";
      categoryName = categoryName ?? "";
      const products = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        include: [
          {
            model: Category,
            as: "category",
            where: {
              name: {
                [Op.iLike]: `${categoryName}%`,
              },
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            as: "author",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProductDetails(req, res, next) {
    try {
      const id = req.params.id;
      const productDetails = await Product.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(productDetails);
    } catch (err) {
      next(err);
    }
  }

  static async getProductImages(req, res, next) {
    try {
      const id = req.params.id;
      const images = await Image.findAll({
        where: {
          productId: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(images);
    } catch (err) {
      next(err);
    }
  }

  static async insertProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let {
        name,
        description,
        material,
        specifications,
        price,
        mainImg,
        categoryId,
        userMongoId,
        images,
      } = req.body;
      const newProduct = await Product.create(
        {
          name,
          description,
          material,
          specifications,
          price,
          mainImg,
          authorId: 1,
          categoryId,
          userMongoId,
        },
        { transaction: t }
      );
      if (images.length > 0) {
        images = images.map((image) => {
          return { productId: newProduct.id, imgUrl: image };
        });
        await Image.bulkCreate(images, { validate: true, transaction: t });
      }
      await t.commit();
      res.status(201).json(newProduct);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async editProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let {
        name,
        description,
        material,
        specifications,
        price,
        mainImg,
        images,
        categoryId,
        userMongoId,
      } = req.body;
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "NotFound" };
      }
      await Product.update(
        {
          name,
          description,
          material,
          specifications,
          price,
          mainImg,
          categoryId,
          authorId: 1,
          userMongoId,
        },
        {
          where: {
            id,
          },
          transaction: t,
        }
      );
      await Image.destroy({
        where: {
          productId: id,
        },
        transaction: t,
      });
      images = images.map((el) => {
        return {
          productId: id,
          imgUrl: el,
        };
      });
      await Image.bulkCreate(images, {
        validate: true,
        transaction: t,
      });
      await t.commit();
      res.status(200).json({
        message: `Product id#${id} has been updated!!`,
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "NotFound" };
      }
      await Product.destroy({
        where: { id },
        transaction: t,
      });
      res.status(200).json({
        message: `Delete product ${id} success !!`,
      });
      await t.commit();
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = ProductController;
