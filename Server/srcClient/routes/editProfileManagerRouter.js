const router = require('express').Router();
const { Manager } = require('../../db/models');

module.exports = router.get('/info/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const manager = await Manager.findOne({ where: { id } });

    if (!manager) {
      res.status(401).json({ message: 'Пользователь не найден' });
    } else {
      res.json({ message: 'Пользователь найден', manager });
    }
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
});
