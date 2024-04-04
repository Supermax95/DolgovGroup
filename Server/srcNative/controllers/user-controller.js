/* eslint-disable class-methods-use-this */
require('dotenv').config();
const userService = require('../services/user-service');

// const { SUCCESS } = process.env;
class UserController {
  async registration(req, res, next) {
    try {
      const {
        lastName,
        firstName,
        middleName,
        email,
        birthDate,
        password,
        phoneNumber,
      } = req.body;
      const userData = await userService.registration(
        lastName,
        firstName,
        middleName,
        email,
        birthDate,
        password,
        phoneNumber
      );

      return res.json(userData);
    } catch (e) {
      const errorMessage = typeof e === 'string' ? e : 'Internal Server Error';
      console.log(errorMessage);
      return res.status(500).json({ message: errorMessage });
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      // Когда будет деплой должно работать
      return res.redirect(`http://lkft.dolgovagro.ru/registration/success`);
      // return res.redirect(`http://${SUCCESS}/registration/success`);
      // return res.redirect('https://ya.ru');
    } catch (e) {
      const errorMessage = typeof e === 'string' ? e : 'Internal Server Error';
      console.log(errorMessage);
      return res.status(500).json({ message: errorMessage });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      return res.json(userData);
    } catch (e) {
      const errorMessage = typeof e === 'string' ? e : 'Internal Server Error';
      console.log(errorMessage);
      return res.status(500).json({ message: errorMessage });
    }
  }

  async logout(req, res, next) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    try {
      const token = await userService.logout(refreshToken);
      // Очищаем сессию и куки
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (e) {
      const errorMessage = typeof e === 'string' ? e : 'Internal Server Error';
      console.log(errorMessage);
      return res.status(500).json({ message: errorMessage });
    }
  }

  async refresh(req, res, next) {
    const { refreshToken } = req.headers;
    console.log(refreshToken);
    try {
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async newPassword(req, res, next) {
    try {
      const { email } = req.body;

      await userService.newPassword(email);

      return res.json({ message: 'Новый пароль отправлен на указанный email' });
    } catch (e) {
      const errorMessage = typeof e === 'string' ? e : 'Internal Server Error';
      console.log(errorMessage);
      return res.status(500).json({ message: errorMessage });
    }
  }
}

module.exports = new UserController();
