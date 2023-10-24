/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        productName: 'Молочкооо',
        promoStartDate: '2023-01-01',
        promoEndDate: '2023-01-15',
        originalPrice: 100,
        customerPrice: 80,
        employeePrice: 50,
        isNew: true,
        isDiscounted: false,
        description: 'Молоко-х***ко',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'Колбасится колбаса',
        promoStartDate: '2023-02-01',
        promoEndDate: '2023-02-15',
        originalPrice: 100,
        customerPrice: 80,
        employeePrice: 50,
        isNew: false,
        isDiscounted: true,
        description: 'Это супер-мега колбаса, которая любит колбаситься...',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
