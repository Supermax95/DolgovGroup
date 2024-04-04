const router = require('express').Router();
const tokenService = require('../services/token-service');
const { DiscountCard } = require('../../db/models');
const UserDto = require('../dtos/user-dto');
const MailService = require('../services/mail-service');
const uuid = require('uuid');
const { PORT, IP } = process.env;

router.get('/check/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;
    const user = await DiscountCard.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ message: 'Аккаунт не активирован' });
    }

    if (user.isActivated) {
      const userDto = new UserDto(user);
      const token = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(user.id, token.refreshToken);
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

router.put('/newRegEmail', async (req, res) => {
  try {
    const { newEmail, userId } = req.body;
    const existingUser = await DiscountCard.findOne({
      where: { email: newEmail },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Этот email уже зарегистрирован' });
    }
    const user = await DiscountCard.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const newActivationLink = uuid.v4();
    user.email = newEmail;
    user.activationLink = newActivationLink;
    await user.save();
    await MailService.sendActivationMail(
      newEmail,
      `http://${IP}:${PORT}/api/activate/${newActivationLink}`
    );

    return res.status(200).json({
      message: 'Новая ссылка для активации аккаунта отправлена',
      newEmail,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
