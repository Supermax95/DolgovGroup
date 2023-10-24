const router = require('express').Router();
const { Location } = require('../../db/models');

router.get('/admin/locations', async (req, res) => {
  try {
    const locations = await Location.findAll({
      order: [['city', 'ASC']],
      raw: true,
    });
    res.json(locations);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.post('/admin/locations', async (req, res) => {
  try {
    await Location.create(req.body);
    const locations = await Location.findAll({ raw: true });
    res.json(locations);
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.delete('/admin/locations/:id', async (req, res) => {
  const locationId = req.params.id;
  try {
    await Location.destroy({
      where: { id: locationId },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/locations/:id', async (req, res) => {
  const locationId = req.params.id;
  try {
    await Location.update(req.body, {
      where: { id: locationId },
    });
    const locations = await Location.findAll({ raw: true });
    res.json(locations);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
