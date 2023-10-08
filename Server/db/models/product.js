const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
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
