'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init(
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
    },
    {
      sequelize,
      modelName: 'Question',
      hooks: {
        beforeCreate: (question) => {
          if (question.title) {
            question.setDataValue('title', question.title.trim());
          }
        },
        beforeUpdate: (question) => {
          if (question.title) {
            question.setDataValue('title', question.title.trim());
          }
        },
      },
    }
  );

  return Question;
};
