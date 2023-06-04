'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const db = require('../db.json');
    let categories = db.categories;
    categories.forEach(category => {
      category.slug = category.name.trim().toLowerCase().split(' ').join('-');
      category.createdAt = new Date();
      category.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Categories", categories);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
