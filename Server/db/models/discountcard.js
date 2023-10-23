const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiscountCard extends Model {
    static associate({ Token, Manager }) {
      this.hasMany(Token, { foreignKey: 'discountCardId' });
      this.belongsTo(Manager, { foreignKey: 'managerId' });
    }
  }
  DiscountCard.init(
    {
      managerId: DataTypes.INTEGER,
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
      cardType: DataTypes.STRING,
      barcode: DataTypes.STRING,
      bonusProgram: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      userStatus: DataTypes.STRING,
      isActivated: DataTypes.BOOLEAN,
      activationLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DiscountCard',
    }
  );
  return DiscountCard;
};
