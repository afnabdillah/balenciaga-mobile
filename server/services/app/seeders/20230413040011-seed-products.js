'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const db = require('../db.json');
    let products = db.products;
    products.forEach(product => {
      product.slug = product.name.toLowerCase().split(' ').join('-');
      product.createdAt = new Date();
      product.updatedAt = new Date();
      product.userMongoId = "645072c5f50dbfe2d2cee833";
    })
    await queryInterface.bulkInsert("Products", products);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
