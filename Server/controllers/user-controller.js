require('dotenv').config();
const cookieParser = require('cookie-parser');
const userService = require('../services/user-service');

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
      //   req.session.userId = userData.newUser.id;
      //   res.cookie('refreshToken', userData.refreshToken, {
      //     maxAge: 30 * 24 * 60 * 60 * 1000,
      //     httpOnly: true,
      //   });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect('https://ya.ru');
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      req.session.userId = userData.user.id;
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  // async logout(req, res, next) {
  //   try {
  //     const { refreshToken } = req.cookies;
  //     const token = await userService.logout(refreshToken);
  //     req.session.destroy(() => {
  //       res.clearCookie('name');
  //       res.status(200).json({ message: 'Logged out successfully' });
  //     res.clearCookie(refreshToken);
  //     return res.json(token);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);

      // Очищаем сессию и куки
      req.session.destroy(() => {
        res.clearCookie('name');
        res.clearCookie(refreshToken);
        res.status(200).json({ message: 'Logged out successfully' });
      });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
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
