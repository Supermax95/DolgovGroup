const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('1', 10);
    const hashedPassword = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert('DiscountCards', [
      {
        lastName: 'Фамилия1',
        firstName: 'Имя1',
        middleName: 'Отчество1',
        birthDate: '1990-01-15',
        email: 'email1@example.com',
        password: hash,
        photo: '',
        cardType: '',
        barcode: '3200000322318',
        bonusProgram: '',
        userStatus: '',
        balance: 1000,
        isActivated: false,
        activationLink: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lastName: 'Фамилия2',
        firstName: 'Имя2',
        middleName: 'Отчество2',
        birthDate: '1995-02-15',
        email: 'email2@example.com',
        password: hash,
        photo: '',
        cardType: '',
        barcode: '3200000322318',
        bonusProgram: '',
        userStatus: '',
        balance: 2000,
        isActivated: false,
        activationLink: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiscountCards', null, {});
  },
};
