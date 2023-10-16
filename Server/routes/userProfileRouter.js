const router = require('express').Router();
const bcrypt = require('bcrypt');
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

  .put('/fullname/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { newLastName, newFirstName, newMiddleName } = req.body;
      console.log('Пришедшие данные:', {
        newLastName,
        newFirstName,
        newMiddleName,
      });

      const user = await DiscountCard.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const lastNameUpdate = await user.update({
        lastName: newLastName,
      });
      console.log('================>lastNameUpdate', lastNameUpdate);

      const firstNameUpdate = await user.update({
        firstName: newFirstName,
      });
      console.log('===========>firstNameUpdate', firstNameUpdate);

      const middleNameUpdate = await user.update({
        middleName: newMiddleName,
      });
      console.log('====>middleNameUpdate', middleNameUpdate);

      res.status(200).json({
        lastName: newLastName,
        firstName: newFirstName,
        middleName: newMiddleName,
        message: 'Фамилия имя отчество успешно изменено',
      });
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
      res.status(200).json({
        message: 'День рождения успешно изменено',
        birthDate: newBirthDate,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/email/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { newEmail } = req.body;
      console.log('Пришедшие данные newEmail:', {
        newEmail,
      });

      const user = await DiscountCard.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const emailUpdate = await user.update({
        email: newEmail,
      });
      console.log('================>emailUpdate', emailUpdate);

      res.status(200).json({
        email: newEmail,
        message: 'Фамилия имя отчество успешно изменено',
      });
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
