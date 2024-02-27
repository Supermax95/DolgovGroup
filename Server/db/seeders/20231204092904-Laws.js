module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Laws',
      [
        {
          title: 'Пример',
          description: '',
          dateFrom: '2023-01-01',
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


// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert(
//       'Laws',
//       [
//         {
//           title: '1Соглашение на продажу почки',
//           description: '',
//           dateFrom: '2023-01-01',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: '11Пользовательское соглашение',
//           description: '',
//           dateFrom: '2023-01-01',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Laws', null, {});
//   },
// };
