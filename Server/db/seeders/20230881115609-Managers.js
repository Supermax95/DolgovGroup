const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('1', 10);
    const hashedPassword = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert('Managers', [
      {
        lastName: 'Admin',
        firstName: 'Admin',
        middleName: 'Admin',
        birthDate: '1990-01-15',
        email: 'admin',
        password: hash,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lastName: 'Manager',
        firstName: 'Manager',
        middleName: 'Manager',
        birthDate: '1990-01-15',
        email: 'manager',
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