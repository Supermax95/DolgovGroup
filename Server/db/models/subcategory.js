const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate({ Product, Category }) {
      this.hasMany(Product, { foreignKey: 'subcategoryId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
    }
  }
  Subcategory.init(
    {
      categoryId: DataTypes.INTEGER,
      subcategoryName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Subcategory',
    }
  );
  return Subcategory;
};
