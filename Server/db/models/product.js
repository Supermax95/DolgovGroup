const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Category }) {
      this.belongsTo(Category, { foreignKey: 'categoryId' });
    }
  }
  Product.init(
    {
      article: DataTypes.STRING,
      productName: DataTypes.STRING,
      promoStartDate: DataTypes.STRING,
      promoEndDate: DataTypes.STRING,
      originalPrice: DataTypes.INTEGER,
      customerPrice: DataTypes.INTEGER,
      employeePrice: DataTypes.INTEGER,
      isNew: DataTypes.BOOLEAN,
      isDiscounted: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      photo: DataTypes.STRING,
      visible: DataTypes.BOOLEAN,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
