/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        productName: 'Товар1',
        promoStartDate: '2023-01-01',
        promoEndDate: '2023-01-15',
        originalPrice: 100,
        discountedPrice: 50,
        category: 'Milk',
        isNew: true,
        isDiscounted: false,
        description: 'Описание товара 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'Товар2',
        promoStartDate: '2023-02-01',
        promoEndDate: '2023-02-15',
        originalPrice: 100,
        discountedPrice: 50,
        category: 'Milk',
        isNew: false,
        isDiscounted: true,
        description: 'Описание товара 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
