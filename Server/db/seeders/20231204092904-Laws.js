module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Laws',
      [
        {
          title: 'Пользовательское соглашение',
          description: 'Вы соглашаетесь на все',
          dateFrom: '2023-01-01',
          documentLink: '/uploads/document/Молоко питьевое пастеризованное.webp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Соглашение на продажу почки',
          description: 'лялялял',
          dateFrom: '2023-01-01',
          documentLink: '/uploads/document/Молоко питьевое пастеризованное.webp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Laws', null, {});
  },
};
