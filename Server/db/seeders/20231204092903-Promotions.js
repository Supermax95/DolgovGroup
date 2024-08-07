module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Promotions',
      [
        {
          title: 'Акция 1',
          description: 'Описание акции 1',
          photo: null,
          dateStart: '',
          dateEnd: '',
          carousel: true,
          invisible: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Promotions', null, {});
  },
};

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert(
//       'Promotions',
//       [
//         {
//           title: 'Акция 1',
//           description: 'Описание акции 1',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: true,
//           invisible: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Акция 2',
//           description: 'Описание акции 2',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: true,
//           invisible: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Акция 3',
//           description: 'Описание акции 3',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: true,
//           invisible: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Акция 5',
//           description: 'Описание акции 5',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: true,
//           invisible: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Акция 6',
//           description: 'Описание акции 6',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: false,
//           invisible: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Акция 7',
//           description: 'Описание акции 7',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: false,
//           invisible: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Акция 8',
//           description: 'Описание акции 8',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: false,
//           invisible: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Акция 9',
//           description: 'Описание акции 9',
//           photo: null,
//           dateStart: '',
//           dateEnd: '',
//           carousel: false,
//           invisible: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Promotions', null, {});
//   },
// };
