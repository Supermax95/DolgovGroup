const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promotion.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      photo: DataTypes.STRING,
      dateStart: DataTypes.STRING,
      dateEnd: DataTypes.STRING,
      carousel: DataTypes.BOOLEAN,
      visible: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Promotion',
    }
  );
  return Promotion;
};
