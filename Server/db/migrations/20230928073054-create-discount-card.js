/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiscountCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      middleName: {
        type: Sequelize.STRING,
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      birthDate: {
        type: Sequelize.DATEONLY,
      },
      password: {
        type: Sequelize.STRING,
      },
      cardType: {
        defaultValue: 'БОНУСНАЯ КАРТА ПОКУПАТЕЛЯ',
        type: Sequelize.STRING,
      },
      barcode: {
        type: Sequelize.STRING,
      },
      bonusProgram: {
        defaultValue: '1 БОНУС = 1 РУБЛЮ',
        type: Sequelize.STRING,
      },
      isEmployee: {
        type: Sequelize.BOOLEAN,
      },
      balance: {
        type: Sequelize.INTEGER,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      activationLink: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('DiscountCards');
  },
};
