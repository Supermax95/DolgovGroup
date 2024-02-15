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
      birthDate: {
        type: Sequelize.DATEONLY,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cardType: {
        defaultValue: 'БОНУСНАЯ КАРТА ПОКУПАТЕЛЯ',
        type: Sequelize.STRING,
      },
      barcode: {
        defaultValue: '',
        type: Sequelize.STRING,
      },
      bonusProgram: {
        defaultValue: '1 БОНУС = 1 РУБЛЮ',
        type: Sequelize.STRING,
      },
      balance: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      userStatus: {
        defaultValue: 'Клиент',
        type: Sequelize.STRING,
      },
      isActivated: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      activationLink: {
        type: Sequelize.STRING,
      },
      emailConfirmationCode: {
        type: Sequelize.STRING,
      },
      newEmail: {
        defaultValue: '',
        type: Sequelize.STRING,
      },
      notificationPush: {
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      notificationEmail: {
        defaultValue: true,
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
    await queryInterface.dropTable('DiscountCards');
  },
};
