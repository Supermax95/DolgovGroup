const router = require('express').Router();
const { Location } = require('../../db/models');

router.get('/admin/locations', async (req, res) => {
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

router.post('/admin/locations', async (req, res) => {
  const { newLocation } = req.body;

  try {
    await Location.create({
      city: newLocation.city,
      address: newLocation.address,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      hours: newLocation.hours,
      invisible: newLocation.invisible,
    });

    const locations = await Location.findAll({
      order: [
        ['city', 'ASC'],
        ['address', 'ASC'],
      ],
      raw: true,
    });

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
    const locations = await Location.findAll({
      order: [
        ['city', 'ASC'],
        ['address', 'ASC'],
      ],
      raw: true,
    });
    res.json(locations);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/locations/:id', async (req, res) => {
  const locationId = req.params.id;
  const { newInfo } = req.body;
  try {
    await Location.update(newInfo, {
      where: { id: locationId },
    });
    const locations = await Location.findAll({
      order: [
        ['city', 'ASC'],
        ['address', 'ASC'],
      ],
      raw: true,
    });
    res.json(locations);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
