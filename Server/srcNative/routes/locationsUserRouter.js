const router = require('express').Router();
const { Location } = require('../../db/models');

router.get('/userlocations', async (req, res) => {
  try {
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
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
