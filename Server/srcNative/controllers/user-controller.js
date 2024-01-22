/* eslint-disable class-methods-use-this */
require('dotenv').config();
const userService = require('../services/user-service');

const { FRONTPORT, IP } = process.env;
class UserController {
  async registration(req, res, next) {
    try {
      const { lastName, firstName, middleName, email, birthDate, password } =
        req.body;
      const userData = await userService.registration(
        lastName,
        firstName,
        middleName,
        email,
        birthDate,
        password
      );
      // req.session.userId = userData.user.id;
      // res.cookie('refreshToken', userData.refreshToken, {
      // maxAge: 30 * 24 * 60 * 60 * 1000,
      // httpOnly: true,
      // });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      // Когда будет деплой должно работать
      return res.redirect(`http://${IP}:${FRONTPORT}/registration/success`);
      // return res.redirect('https://ya.ru');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      // req.session.userId = userData.user.id;
      // req.session.refreshToken = userData.refreshToken;
      // res.cookie('refreshToken', userData.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      // });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    console.log(refreshToken);
    try {
      const token = await userService.logout(refreshToken);
      // Очищаем сессию и куки
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (e) {
      next(e);
    }
  }

  // async refresh(req, res, next) {
  //   try {
  //     const { refreshToken } = req.cookies;
  //     const { email } = req.body;
  //     const userData = await userService.refresh(email);
  //     res.cookie('refreshToken', userData.refreshToken, {
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //       httpOnly: true,
  //     });
  //     return res.json(userData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async refresh(req, res, next) {
    const { refreshToken } = req.headers;
    console.log(refreshToken);
    try {
      const userData = await userService.refresh(refreshToken);
      // res.cookie('refreshToken', userData.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      // });
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
      next(e);
    }
  }
}

module.exports = new UserController();
