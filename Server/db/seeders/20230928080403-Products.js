/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Товар1',
        promo_start_date: '2023-01-01',
        promo_end_date: '2023-01-15',
        price_start: 100,
        price_end: 50,
        category: 'Milk',
        is_new: true,
        description: 'Описание товара 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Товар2',
        promo_start_date: '2023-02-01',
        promo_end_date: '2023-02-15',
        price_start: 100,
        price_end: 50,
        category: 'Milk',
        is_new: false,
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
