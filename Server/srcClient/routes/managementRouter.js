const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Manager } = require('../../db/models');

module.exports = router.get('/data', async (req, res) => {
  try {
    const manager = await Manager.findAll({
      where: {
        isAdmin: false,
      },
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
        ['middleName', 'ASC'],
      ],
      raw: true,
    });
    res.json(manager);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});
