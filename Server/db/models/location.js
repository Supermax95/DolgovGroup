const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate() {}
  }
  Location.init(
    {
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      hours: DataTypes.STRING,
      visible: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};
