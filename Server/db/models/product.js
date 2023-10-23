const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Manager }) {
      this.belongsTo(Manager, { foreignKey: 'managerId' });
    }
  }
  Product.init(
    {
      managerId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      promoStartDate: DataTypes.STRING,
      promoEndDate: DataTypes.STRING,
      originalPrice: DataTypes.INTEGER,
      discountedPrice: DataTypes.INTEGER,
      isNew: DataTypes.BOOLEAN,
      isDiscounted: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      photo: DataTypes.STRING,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
