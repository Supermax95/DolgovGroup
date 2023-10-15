const router = require('express').Router();
const bcrypt = require('bcrypt');
const moment = require('moment');
const { DiscountCard } = require('../db/models');
// const { log } = require('console');

module.exports = router
  .get('/edit/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const dataUser = await DiscountCard.findOne({ where: { id: userId } });

      // if (dataUser && dataUser.birthDate) {
      //   dataUser.dataValues.birthDate = moment(
      //     dataUser.dataValues.birthDate
      //   ).format('DD.MM.YYYY');
      // }
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
      console.log('Пришедшие данные newBirthDate:', newBirthDate);

      const user = await DiscountCard.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const birthDateUpdate = await user.update({
        birthDate: newBirthDate,
      });

      console.log('================>', birthDateUpdate);
      res.status(200).json({ message: 'День рождения успешно изменено' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/newpassword/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { oldPassword, newPassword } = req.body;

      const user = await DiscountCard.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Старый пароль неверен' });
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await user.update({ password: hash });

      res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
      console.error('Произошла ошибка при изменении пароля:', error);
      res.status(500).json({ error: 'Произошла ошибка' });
    }
  });
