const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    static associate({ Subcategory }) {
      this.belongsTo(Subcategory, { foreignKey: 'subcategoryId' });
    }
  }

  Product.init(
    {
      article: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('article', value.trim());
        },
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('productName', value.trim());
        },
      },
      promoStartDate: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('promoStartDate', value ? value.trim() : null);
        },
      },
      promoEndDate: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('promoEndDate', value ? value.trim() : null);
        },
      },
      originalPrice: DataTypes.FLOAT,
      customerPrice: DataTypes.FLOAT,
      employeePrice: DataTypes.FLOAT,
      isNew: DataTypes.BOOLEAN,
      isDiscounted: DataTypes.BOOLEAN,
      description: {
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue('description', value ? value.trim() : null);
        },
      },
      photo: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('photo', value ? value.trim() : null);
        },
      },
      invisible: DataTypes.BOOLEAN,
      subcategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
      // Хук перед созданием и обновлением
      hooks: {
        beforeCreate: (product) => {
          product.setDataValue('article', product.article.trim());
          product.setDataValue('productName', product.productName.trim());
          product.setDataValue(
            'promoStartDate',
            product.promoStartDate ? product.promoStartDate.trim() : null
          );
          product.setDataValue(
            'promoEndDate',
            product.promoEndDate ? product.promoEndDate.trim() : null
          );
          product.setDataValue(
            'description',
            product.description ? product.description.trim() : null
          );
          product.setDataValue(
            'photo',
            product.photo ? product.photo.trim() : null
          );
        },
        beforeUpdate: (product) => {
          product.setDataValue('article', product.article.trim());
          product.setDataValue('productName', product.productName.trim());
          product.setDataValue(
            'promoStartDate',
            product.promoStartDate ? product.promoStartDate.trim() : null
          );
          product.setDataValue(
            'promoEndDate',
            product.promoEndDate ? product.promoEndDate.trim() : null
          );
          product.setDataValue(
            'description',
            product.description ? product.description.trim() : null
          );
          product.setDataValue(
            'photo',
            product.photo ? product.photo.trim() : null
          );
        },
      },
    }
  );

  return Product;
};
