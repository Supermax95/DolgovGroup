/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Subcategories',
      [
        {
          categoryId: 1,
          subcategoryName: 'Творожки',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subcategories', null, {});
  },
};


// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert(
//       'Subcategories',
//       [
//         {
//           categoryId: 1,
//           subcategoryName: 'Молоко',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           categoryId: 1,
//           subcategoryName: 'Творожки',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           categoryId: 1,
//           subcategoryName: 'Йогурты',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           categoryId: 2,
//           subcategoryName: 'Колбаса',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           categoryId: 2,
//           subcategoryName: 'Ветчина',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           categoryId: 2,
//           subcategoryName: 'Буженина',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           categoryId: 1,
//           subcategoryName: 'Кефир',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Subcategories', null, {});
//   },
// };
