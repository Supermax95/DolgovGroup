/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Товар1',
        promoStartDate: '2023-01-01',
        promoEndDate: '2023-01-15',
        priceStart: 100,
        priceEnd: 50,
        category: 'Milk',
        isNew: true,
        description: 'Описание товара 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Товар2',
        promoStartDate: '2023-02-01',
        promoEndDate: '2023-02-15',
        priceStart: 100,
        priceEnd: 50,
        category: 'Milk',
        isNew: false,
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
