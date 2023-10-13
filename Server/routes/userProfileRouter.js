const router = require('express').Router();
const moment = require('moment');
const { DiscountCard } = require('../db/models');

module.exports = router
  .get('/edit/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const dataUser = await DiscountCard.findOne({ where: { id: userId } });

      res.json(dataUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/calendar/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { newBirthDate } = req.body;

      const user = await DiscountCard.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const birthDateUpdate = await user.update({
        where: { birthDate: newBirthDate },
      });

      console.log('================>', birthDateUpdate);
      res.status(200).json({ message: 'День рождения успешно изменено' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  });
