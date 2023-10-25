const router = require('express').Router();
const { Manager } = require('../../db/models');

module.exports = router.get('/login', async (req, res) => {
  try {
    const aalll = await Manager.findAll({ raw: true });
    res.json(aalll);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
  }
});
