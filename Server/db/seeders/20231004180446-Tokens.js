/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tokens', [
      {
        discountCardId: 1, // ID соответствующей карточки DiscountCard
        refreshToken: 'token1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        discountCardId: 2, // ID соответствующей карточки DiscountCard
        refreshToken: 'token2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tokens', null, {});
  },
};
