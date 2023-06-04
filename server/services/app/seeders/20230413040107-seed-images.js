'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const db = require('../db.json');
    let images = db.images;
    images.forEach(image => {
      image.createdAt = new Date();
      image.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Images", images);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
