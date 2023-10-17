const express = require('express');
const tokenService = require('../services/token-service');

const router = express.Router();
const { DiscountCard } = require('../db/models');
const UserDto = require('../dtos/user-dto');

router.get('/check/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const user = await DiscountCard.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.isActivated === true) {
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      console.log('Access Token:', tokens.accessToken);
      await tokenService.saveToken(user.id, tokens.refreshToken);
      req.session.userId = userDto.id;
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res
        .status(200)
        .json({ message: 'Аккаунт активирован', tokens, user: userDto });
    }

    return res.status(403).json({ message: 'Аккаунт не активирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
