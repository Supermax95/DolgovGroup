const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
      email: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      password: DataTypes.STRING,
      cardType: DataTypes.STRING,
      barcode: DataTypes.STRING,
      bonusProgram: DataTypes.STRING,
      isEmployee: DataTypes.BOOLEAN,
      balance: DataTypes.INTEGER,
      isAdmin: DataTypes.BOOLEAN,
      isActivated: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
      activationLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DiscountCard',
    }
  );
  return DiscountCard;
};
