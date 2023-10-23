module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Locations', [
      {
        city: 'Калинград',
        adress: 'ул. Куйбышева, 109-111',
        latitude: 54.725607,
        longitude: 20.5382,
        hours: 'ежедневно с 8:00 до 20:00 (14:00-14:30)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        city: 'Калинград',
        adress: 'ул. Черняховская, 129-111',
        latitude: 55.725607,
        longitude: 30.5382,
        hours: 'ежедневно с 8:00 до 20:00 (14:00-14:30)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        city: 'Калинград',
        adress: 'ул. Черняховская, 129-111',
        latitude: 55.725607,
        longitude: 32.5382,
        hours: 'ежедневно с 8:00 до 20:00 (14:00-14:30)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiscountCards', null, {});
  },
};
