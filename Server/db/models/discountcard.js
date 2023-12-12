const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DiscountCard extends Model {
    static associate({ Token }) {
      this.hasMany(Token, { foreignKey: 'discountCardId' });
    }
  }

  DiscountCard.init(
    {
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('lastName', value.trim());
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('firstName', value.trim());
        },
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('middleName', value.trim());
        },
      },
      birthDate: DataTypes.DATEONLY,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('email', value.trim());
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('password', value.trim());
        },
      },
      photo: DataTypes.STRING,
      cardType: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('cardType', value.trim());
        },
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('barcode', value.trim());
        },
      },
      bonusProgram: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('bonusProgram', value.trim());
        },
      },
      balance: DataTypes.INTEGER,
      userStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('userStatus', value.trim());
        },
      },
      isActivated: DataTypes.BOOLEAN,
      activationLink: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('activationLink', value.trim());
        },
      },
    },
    {
      sequelize,
      modelName: 'DiscountCard',
      // Хук перед созданием и обновлением
      hooks: {
        beforeCreate: (discountCard) => {
          discountCard.setDataValues({
            lastName: discountCard.lastName.trim(),
            firstName: discountCard.firstName.trim(),
            middleName: discountCard.middleName.trim(),
            email: discountCard.email.trim(),
            password: discountCard.password.trim(),
            cardType: discountCard.cardType.trim(),
            barcode: discountCard.barcode.trim(),
            bonusProgram: discountCard.bonusProgram.trim(),
            userStatus: discountCard.userStatus.trim(),
            activationLink: discountCard.activationLink.trim(),
          });
        },
        beforeUpdate: (discountCard) => {
          discountCard.setDataValues({
            lastName: discountCard.lastName.trim(),
            firstName: discountCard.firstName.trim(),
            middleName: discountCard.middleName.trim(),
            email: discountCard.email.trim(),
            password: discountCard.password.trim(),
            cardType: discountCard.cardType.trim(),
            barcode: discountCard.barcode.trim(),
            bonusProgram: discountCard.bonusProgram.trim(),
            userStatus: discountCard.userStatus.trim(),
            activationLink: discountCard.activationLink.trim(),
          });
        },
      },
    }
  );

  return DiscountCard;
};
