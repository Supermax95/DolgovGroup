'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          categoryName: 'Молочные продукты',
          subcategory: ' Йогурт',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: 'Колбасные изделия',
          subcategory: ' Ветчина',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   categoryName: 'Колбасные изделия',
        //   subcategory: ' Колбаса',
        // },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};