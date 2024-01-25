const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DiscountCard } = require('../../db/models');

module.exports = router
  .get('/edit', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const dataUser = await DiscountCard.findOne({ where: { id: user.id } });
      res.json(dataUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/fullname', async (req, res) => {
    try {
      const { newLastName, newFirstName, newMiddleName } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      console.log('Пришедшие данные:', {
        newLastName,
        newFirstName,
        newMiddleName,
      });

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const lastNameUpdate = await userData.update({
        lastName: newLastName,
      });
      console.log('================>lastNameUpdate', lastNameUpdate);

      const firstNameUpdate = await userData.update({
        firstName: newFirstName,
      });
      console.log('===========>firstNameUpdate', firstNameUpdate);

      const middleNameUpdate = await userData.update({
        middleName: newMiddleName,
      });

      console.log('====>middleNameUpdate', middleNameUpdate);

      res.status(200).json({
        lastName: newLastName,
        firstName: newFirstName,
        middleName: newMiddleName,
        message: 'Фамилия, имя и отчество успешно изменены',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/calendar', async (req, res) => {
    try {
      const { newBirthDate } = req.body;
      const token = req.headers.authorization.split(' ')[1];

      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      console.log('Пришедшие данные newBirthDate:', newBirthDate);
      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      await userData.update({
        birthDate: newBirthDate,
      });
      res.status(200).json({
        message: 'День рождения успешно изменено',
        birthDate: newBirthDate,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/email', async (req, res) => {
    try {
      const { newEmail } = req.body;

      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const searchEmail = await DiscountCard.findOne({
        where: { email: newEmail },
      });

      if (searchEmail) {
        return res.status(409).json({
          message: 'Пользователь с такой электронной почтой уже существует',
        });
      }

      const emailUpdate = await userData.update({
        email: newEmail,
      });
      console.log('emailUpdate', emailUpdate);

      res.status(200).json({
        email: newEmail,
        message: 'Email успешно изменен',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/newpassword', async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      console.log('req.headers', req.headers);

      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        userData.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Старый пароль неверен' });
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await userData.update({ password: hash });

      res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
      console.error('Произошла ошибка при изменении пароля:', error);
      res.status(500).json({ error: 'Произошла ошибка' });
    }
  })

  .put('/notification', async (req, res) => {
    try {
      const { notificationEmail, notificationPush } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Отсутствует токен авторизации' });
      }
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      if (!user || !user.id) {
        return res.status(401).json({ error: 'Неверный токен авторизации' });
      }
      const userToUpdate = await DiscountCard.findByPk(user.id);
      if (!userToUpdate) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      await userToUpdate.update({
        notificationEmail,
        notificationPush,
      });

      return res
        .status(200)
        .json({notificationEmail,notificationPush, message: 'Настройки уведомлений успешно обновлены' });
    } catch (error) {
      console.error('Ошибка при обновлении настроек уведомлений:', error);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });
