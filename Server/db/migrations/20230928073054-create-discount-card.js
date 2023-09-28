/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discount_Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      middle_name: {
        type: Sequelize.STRING,
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
      },
      card_type: {
        defaultValue: 'БОНУСНАЯ КАРТА ПОКУПАТЕЛЯ',
        type: Sequelize.STRING,
      },
      barcode: {
        type: Sequelize.STRING,
      },
      bonus_program: {
        defaultValue: '1 БОНУС = 1 РУБЛЮ',
        type: Sequelize.STRING,
      },
      is_employee: {
        type: Sequelize.BOOLEAN,
      },
      balance: {
        type: Sequelize.INTEGER,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Discount_Cards');
  },
};
