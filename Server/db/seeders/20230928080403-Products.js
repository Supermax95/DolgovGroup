/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        article: '123456',
        productName: 'Молоко',
        promoStartDate: '2023-01-01',
        promoEndDate: '2023-01-15',
        originalPrice: 100,
        customerPrice: 80,
        employeePrice: 50,
        isNew: true,
        isDiscounted: false,
        description: 'Вкууусное молоко',
        visible: true,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        article: '654321',
        productName: 'Колбаса',
        promoStartDate: '2023-02-01',
        promoEndDate: '2023-02-15',
        originalPrice: 100,
        customerPrice: 80,
        employeePrice: 50,
        isNew: false,
        isDiscounted: true,
        description: 'Вкусная колбаса',
        visible: true,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
