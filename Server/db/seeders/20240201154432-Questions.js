'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          title: 'Ты дурак?',
          description: 'Я просто танцую',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Лялялял',
          description: 'Блялялялял',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};