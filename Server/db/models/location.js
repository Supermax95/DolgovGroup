const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate() {}
  }
  Location.init(
    {
      city: DataTypes.STRING,
      adress: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      hours: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};
