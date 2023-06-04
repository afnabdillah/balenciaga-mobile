'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey : "productId",
        as : 'images'
      });
    }
  }
  Image.init({
    productId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Product id is required'
        },
        notEmpty : {
          msg : 'Product id is required'
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Product Image Url is required'
        },
        notEmpty : {
          msg : 'Product Image Url is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};