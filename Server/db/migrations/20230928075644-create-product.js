/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      article: {
        type: Sequelize.STRING,
      },
      productName: {
        type: Sequelize.STRING,
      },
      promoStartDate: {
        type: Sequelize.STRING,
      },
      promoEndDate: {
        type: Sequelize.STRING,
      },
      originalPrice: {
        type: Sequelize.INTEGER,
      },
      customerPrice: {
        type: Sequelize.INTEGER,
      },
      employeePrice: {
        type: Sequelize.INTEGER,
      },
      isNew: {
        type: Sequelize.BOOLEAN,
      },
      isDiscounted: {
        type: Sequelize.BOOLEAN,
      },
      description: {
        type: Sequelize.STRING,
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      visible: {
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Subcategories',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
