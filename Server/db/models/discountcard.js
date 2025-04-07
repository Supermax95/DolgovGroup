const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DiscountCard extends Model {
    static associate({ Token }) {
      this.hasMany(Token, { foreignKey: 'discountCardId' });
    }
  }

  DiscountCard.init(
    {
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
      cardType: DataTypes.STRING,
      barcode: DataTypes.STRING,
      bonusProgram: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      userStatus: DataTypes.STRING,
      isActivated: DataTypes.BOOLEAN,
      newEmail: DataTypes.STRING,
      activationLink: DataTypes.STRING,
      emailConfirmationCode: DataTypes.STRING,
      notificationPush: DataTypes.BOOLEAN,
      notificationEmail: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'DiscountCard',
      hooks: {
        beforeCreate: (discountCard) => {
          discountCard.lastName = discountCard.lastName?.trim();
          discountCard.firstName = discountCard.firstName?.trim();
          discountCard.middleName = discountCard.middleName?.trim();
          discountCard.phoneNumber = discountCard.phoneNumber?.trim();
          discountCard.email = discountCard.email?.trim();
          discountCard.password = discountCard.password?.trim();
          discountCard.cardType = discountCard.cardType?.trim();
          discountCard.barcode = discountCard.barcode?.trim();
          discountCard.bonusProgram = discountCard.bonusProgram?.trim();
          discountCard.userStatus = discountCard.userStatus?.trim();
          discountCard.newEmail = discountCard.newEmail?.trim();
          discountCard.activationLink = discountCard.activationLink?.trim();
          discountCard.emailConfirmationCode = discountCard.emailConfirmationCode?.trim();

        },
        beforeUpdate: (discountCard) => {
          discountCard.lastName = discountCard.lastName?.trim();
          discountCard.firstName = discountCard.firstName?.trim();
          discountCard.middleName = discountCard.middleName?.trim();
          discountCard.phoneNumber = discountCard.phoneNumber?.trim();
          discountCard.email = discountCard.email?.trim();
          discountCard.password = discountCard.password?.trim();
          discountCard.cardType = discountCard.cardType?.trim();
          discountCard.barcode = discountCard.barcode?.trim();
          discountCard.bonusProgram = discountCard.bonusProgram?.trim();
          discountCard.userStatus = discountCard.userStatus?.trim();
          discountCard.newEmail = discountCard.newEmail?.trim();
          discountCard.activationLink = discountCard.activationLink?.trim();
          discountCard.emailConfirmationCode = discountCard.emailConfirmationCode?.trim();
        },
      },
    }
  );

  return DiscountCard;
};
