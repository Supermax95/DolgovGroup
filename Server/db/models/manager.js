const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    static associate({ Location, DiscountCard, Product }) {
      this.hasMany(Location, { foreignKey: 'managerId' });
      this.hasMany(DiscountCard, { foreignKey: 'managerId' });
      this.hasMany(Product, { foreignKey: 'managerId' });
    }
  }

  Manager.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
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
