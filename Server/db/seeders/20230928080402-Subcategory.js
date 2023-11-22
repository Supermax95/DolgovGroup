/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Subcategories',
      [
        {
          categoryId: 1,
          subcategoryName: 'Йогурт',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          subcategoryName: 'Колбаса',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subcategories', null, {});
  },
};
