const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Location } = require('../../db/models');

router.get('/admin/locations', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.post('/admin/locations', async (req, res) => {
  const newData = req.body;

  try {
    const location = await Location.create(newData);

    res.json(location);
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.delete('/admin/locations/:id', async (req, res) => {
  const locationId = req.params.id;

  try {
    const result = await Location.destroy({ where: { id: locationId } });

    if (result === 1) {
      res.json({ message: 'Данные успешно удалены' });
    } else {
      res.status(404).json({ error: 'Запись не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/locations/:id', async (req, res) => {
  const locationId = req.params.id;
  const updatedData = req.body;

  try {
    const [result] = await Location.update(updatedData, {
      where: { id: locationId },
    });

    if (result === 1) {
      res.json({ message: 'Данные успешно обновлены' });
    } else {
      res.status(404).json({ error: 'Запись не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
