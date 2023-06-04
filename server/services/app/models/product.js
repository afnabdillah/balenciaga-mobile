"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "author",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      Product.hasMany(models.Image, {
        foreignKey: "productId",
        as: "images",
        onDelete: "cascade",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product name is required",
          },
          notEmpty: {
            msg: "Product name is required",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product slug is required",
          },
          notEmpty: {
            msg: "Product slug is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product description is required",
          },
          notEmpty: {
            msg: "Product description is required",
          },
        },
      },
      material: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product material is required",
          },
          notEmpty: {
            msg: "Product material is required",
          },
        },
      },
      specifications: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product specifications is required",
          },
          notEmpty: {
            msg: "Product specifications is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product price is required",
          },
          notEmpty: {
            msg: "Product price is required",
          },
          min: {
            args: [0],
            msg: "Minimum product price is 0",
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product main image is required",
          },
          notEmpty: {
            msg: "Product main image is required",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product category id is required",
          },
          notEmpty: {
            msg: "Product category id is required",
          },
        },
      },
      authorId: {
        type: DataTypes.STRING,
      },
      userMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  Product.beforeValidate((product) => {
    product.slug = product.name.toLowerCase().split(" ").join("-");
  });

  Product.beforeUpdate((product) => {
    product.slug = product.name.toLowerCase().split(" ").join("-");
  });
  return Product;
};
