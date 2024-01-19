const express = require('express');
const tokenService = require('../services/token-service');

const router = express.Router();
const { DiscountCard } = require('../../db/models');
const UserDto = require('../dtos/user-dto');

router.get('/check/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Получен userId:', userId);

    const user = await DiscountCard.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.isActivated) {
      const userDto = new UserDto(user);
      console.log('uuuuussssseerrrr', userDto);
      const token = tokenService.generateTokens({ ...userDto });
      console.log('Access Token:', token.accessToken);
      await tokenService.saveToken(user.id, token.refreshToken);
      req.session.userId = userDto.id;
        req.session.refreshToken = token.refreshToken;
      // res.cookie('refreshToken', token.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      // });
      // console.log('Отправлен токен:', token);
      console.log('Отправляем на клиент:', {
        message: 'Аккаунт активирован',
        token,
        user: userDto,
      });

      return res.status(200).json({
        message: 'Аккаунт активирован',
        token,
        user: userDto,
      });
    }
    const userDto = new UserDto(user);
    return res
      .status(403)
      .json({ message: 'Аккаунт не активирован', user: userDto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
