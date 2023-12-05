const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Subcategory }) {
      this.belongsTo(Subcategory, { foreignKey: 'subcategoryId' });
    }
  }
  Product.init(
    {
      article: DataTypes.STRING,
      productName: DataTypes.STRING,
      promoStartDate: DataTypes.STRING,
      promoEndDate: DataTypes.STRING,
      originalPrice: DataTypes.FLOAT,
      customerPrice: DataTypes.FLOAT,
      employeePrice: DataTypes.FLOAT,
      isNew: DataTypes.BOOLEAN,
      isDiscounted: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
      photo: DataTypes.STRING,
      invisible: DataTypes.BOOLEAN,
      subcategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
