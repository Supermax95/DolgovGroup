const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Location extends Model {
    static associate() {}
  }

  Location.init(
    {
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('city', value.trim());
        },
      },
      address: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('address', value.trim());
        },
      },
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      hours: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('hours', value.trim());
        },
      },
      invisible: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Location',
      // Хук перед созданием и обновлением
      hooks: {
        beforeCreate: (location) => {
          location.setDataValue('city', location.city.trim());
          location.setDataValue('address', location.address.trim());
          location.setDataValue('hours', location.hours.trim());
        },
        beforeUpdate: (location) => {
          location.setDataValue('city', location.city.trim());
          location.setDataValue('address', location.address.trim());
          location.setDataValue('hours', location.hours.trim());
        },
      },
    }
  );

  return Location;
};
