const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate({ Manager }) {
      this.belongsTo(Manager, { foreignKey: 'managerId' });
    }
  }
  Location.init(
    {
      managerId: DataTypes.INTEGER,
      city: DataTypes.STRING,
      adress: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      hours: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};
