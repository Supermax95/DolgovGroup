const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Manager extends Model {
    static associate() {}

    // Вспомогательный метод для обрезки пробелов в строковых полях
    trimStringFields() {
      Object.keys(this.dataValues).forEach((key) => {
        const value = this.getDataValue(key);
        if (typeof value === 'string') {
          this.setDataValue(key, value.trim());
        }
      });
    }

    // Геттер и сеттер для строковых полей
    setStringField(key, value) {
      this.setDataValue(key, value.trim());
    }

    // Хук перед сохранением
    beforeSave() {
      Object.keys(this.dataValues).forEach((key) => {
        const value = this.getDataValue(key);
        if (typeof value === 'string') {
          this.setStringField(key, value);
        }
      });
    }
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

  // Хук перед созданием и обновлением
  Manager.beforeCreate((manager) => {
    manager.trimStringFields();
  });

  Manager.beforeUpdate((manager) => {
    manager.trimStringFields();
  });

  return Manager;
};
