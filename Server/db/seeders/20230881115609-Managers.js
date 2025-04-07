const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('1', 10);
    const hashedPassword = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert('Managers', [
      {
        lastName: 'Админ',
        firstName: 'Админ',
        middleName: 'Админ',
        phone: '+7 (000) 000-00-00',
        email: 'admin@mail.ru',
        password: hash,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lastName: 'Маркетолог',
        firstName: 'Маркетолог',
        middleName: 'Маркетолог',
        phone: '+7 (111) 111-11-11',
        email: 'manager@mail.ru',
        password: hashedPassword,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Managers', null, {});
  },
};
