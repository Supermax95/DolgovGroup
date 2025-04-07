const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate({ DiscountCard }) {
      this.belongsTo(DiscountCard, { foreignKey: 'discountCardId' });
    }
  }
  Token.init(
    {
      discountCardId: DataTypes.INTEGER,
      refreshToken: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Token',
    }
  );
  return Token;
};
