const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Promotion extends Model {
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
          if (typeof value === 'string') {
            this.setDataValue('title', value.trim());
          }
        },
      },
      description: DataTypes.TEXT,
      photo: {
        type: DataTypes.STRING,
        set(value) {
          if (typeof value === 'string') {
            this.setDataValue('photo', value.trim());
          }
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
      hooks: {
        beforeCreate: (promotion) => {
          if (promotion.title) {
            promotion.setDataValue('title', promotion.title.trim());
          }
          if (promotion.photo) {
            promotion.setDataValue('photo', promotion.photo.trim());
          }
        },
        beforeUpdate: (promotion) => {
          if (promotion.title) {
            promotion.setDataValue('title', promotion.title.trim());
          }
          if (promotion.photo) {
            promotion.setDataValue('photo', promotion.photo.trim());
          }
        },
      },
    }
  );

  return Promotion;
};
