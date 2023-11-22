const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Subcategory }) {
      this.hasMany(Subcategory, { foreignKey: 'categoryId' });
    }
  }
  Category.init(
    {
      categoryName: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
