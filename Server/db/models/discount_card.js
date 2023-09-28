const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discount_Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount_Card.init(
    {
      last_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      middle_name: DataTypes.STRING,
      email: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      password: DataTypes.STRING,
      card_type: DataTypes.STRING,
      barcode: DataTypes.STRING,
      bonus_program: DataTypes.STRING,
      is_employee: DataTypes.BOOLEAN,
      balance: DataTypes.INTEGER,
      is_admin: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Discount_Card',
    }
  );
  return Discount_Card;
};
