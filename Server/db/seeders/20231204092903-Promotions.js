module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Promotions',
      [
        {
          title: 'Акция 1',
          description: 'Описание акции 1',
          photo: 'ссылка_на_фото_1',
          dateStart: '2023-01-01',
          dateEnd: '2023-01-15',
          carousel: true,
          invisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Акция 2',
          description: 'Описание акции 2',
          photo: 'ссылка_на_фото_2',
          dateStart: '2023-02-01',
          dateEnd: '2023-02-28',
          carousel: false,
          invisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Promotions', null, {});
  },
};
