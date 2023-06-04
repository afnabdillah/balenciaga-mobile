'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {foreignKey : 'categoryId'});
    }
  }
  Category.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Category name is required'
        },
        notEmpty : {
          msg : 'Category name is required'
        }
      }
    },
    slug : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Category slug is required'
        },
        notEmpty : {
          msg : 'Category slug is required'
        }
      }
    },
    categoryImgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Category image is required'
        },
        notEmpty : {
          msg : 'Category image is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });

  Category.beforeValidate(category => {
    category.slug = category.name.trim().toLowerCase().split(' ').join('-');
  })
  return Category;
};