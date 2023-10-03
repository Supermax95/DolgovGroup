const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiscountCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiscountCard.init(
    {
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      email: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      password: DataTypes.STRING,
      cardType: DataTypes.STRING,
      barcode: DataTypes.STRING,
      bonusProgram: DataTypes.STRING,
      isEmployee: DataTypes.BOOLEAN,
      balance: DataTypes.INTEGER,
      isAdmin: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Discount_Card',
    }
  );
  return DiscountCard;
};
