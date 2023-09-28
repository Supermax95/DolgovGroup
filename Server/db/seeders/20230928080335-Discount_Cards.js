const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('1', 10);
    const hashedPassword = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert('Discount_Cards', [
      {
        last_name: 'Фамилия1',
        first_name: 'Имя1',
        middle_name: 'Отчество1',
        email: 'email1@example.com',
        birth_date: '1990-01-01',
        password: hash,
        card_type: '',
        barcode: '3200000322318',
        bonus_program: '',
        is_employee: false,
        balance: 1000,
        is_admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        last_name: 'Фамилия2',
        first_name: 'Имя2',
        middle_name: 'Отчество2',
        email: 'email2@example.com',
        birth_date: '1995-02-15',
        password: hash,
        card_type: '',
        barcode: '3200000322318',
        bonus_program: '',
        is_employee: false,
        balance: 2000,
        is_admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discount_Cards', null, {});
  },
};
