const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Subcategory extends Model {
    static associate({ Product, Category }) {
      this.hasMany(Product, { foreignKey: 'subcategoryId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
    }
  }

  Subcategory.init(
    {
      categoryId: DataTypes.INTEGER,
      subcategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('subcategoryName', value.trim());
        },
      },
    },
    {
      sequelize,
      modelName: 'Subcategory',
      // Хук перед созданием и обновлением
      hooks: {
        beforeCreate: (subcategory) => {
          subcategory.setDataValue(
            'subcategoryName',
            subcategory.subcategoryName.trim()
          );
        },
        beforeUpdate: (subcategory) => {
          subcategory.setDataValue(
            'subcategoryName',
            subcategory.subcategoryName.trim()
          );
        },
      },
    }
  );

  return Subcategory;
};
