'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Promotions', 'oldPrice', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addColumn('Promotions', 'newPrice', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Promotions', 'oldPrice');
    await queryInterface.removeColumn('Promotions', 'newPrice');
  }
};
