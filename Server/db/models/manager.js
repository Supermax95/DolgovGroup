const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    static associate() {}
  }

  Manager.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Manager',
    }
  );
  return Manager;
};
