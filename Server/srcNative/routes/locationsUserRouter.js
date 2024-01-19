const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Location } = require('../../db/models');

router.get('/userlocations', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);
    if (!token) {
      return res.status(401).json({ error: 'Пользователь не авторизован' });
    }
    const locations = await Location.findAll({
      order: [
        ['city', 'ASC'],
        ['address', 'ASC'],
      ],
      raw: true,
    });
    res.json(locations);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Невалидный токен' });
    } else {
      res.status(500).json({ error: 'Произошла ошибка на сервере' });
    }
  }
});

module.exports = router;
