const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('title', value.trim());
        },
      },
      description: DataTypes.TEXT,
      photo: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('photo', value.trim());
        },
      },
      dateStart: DataTypes.STRING,
      dateEnd: DataTypes.STRING,
      carousel: DataTypes.BOOLEAN,
      invisible: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Promotion',
      // Хук перед созданием и обновлением
      hooks: {
        beforeCreate: (promotion) => {
          promotion.setDataValue('title', promotion.title.trim());
          promotion.setDataValue('photo', promotion.photo.trim());
        },
        beforeUpdate: (promotion) => {
          promotion.setDataValue('title', promotion.title.trim());
          promotion.setDataValue('photo', promotion.photo.trim());
        },
      },
    }
  );

  return Promotion;
};
