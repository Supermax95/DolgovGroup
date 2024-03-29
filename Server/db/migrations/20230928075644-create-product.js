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
        type: Sequelize.FLOAT,
      },
      customerPrice: {
        type: Sequelize.FLOAT,
      },
      employeePrice: {
        type: Sequelize.FLOAT,
      },
      isNew: {
        type: Sequelize.BOOLEAN,
      },
      isDiscounted: {
        type: Sequelize.BOOLEAN,
      },
      description: {
        type: Sequelize.TEXT,
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      invisible: {
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
