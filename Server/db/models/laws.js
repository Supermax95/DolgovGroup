const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Law extends Model {
    static associate(models) {
      // Определите ассоциации здесь, если они есть
    }
  }

  Law.init(
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
      dateFrom: DataTypes.STRING,
      documentLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Law',
      hooks: {
        beforeCreate: (law) => {
          if (law.title) {
            law.setDataValue('title', law.title.trim());
          }
        },
        beforeUpdate: (law) => {
          if (law.title) {
            law.setDataValue('title', law.title.trim());
          }
        },
      },
    }
  );

  return Law;
};
