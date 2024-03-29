const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Subcategory }) {
      this.hasMany(Subcategory, { foreignKey: 'categoryId' });
    }
  }

  Category.init(
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('categoryName', value.trim());
        },
      },
      img: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('img', value ? value.trim() : null);
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  return Category;
};
