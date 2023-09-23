const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_URL);

module.exports = async function dbConnectCheck() {
  try {
    await sequelize.authenticate();
    console.log('БАЗА ПОДКЛЮЧЕНА!');
  } catch (error) {
    console.log('БАЗА НЕ ПОДКЛЮЧЕНА ==>', error);
  }
};
