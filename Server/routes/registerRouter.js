const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const MailService = require('../services/mail-service');
const TokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const { DiscountCard } = require('../db/models');


const router = express.Router();

router.post('/register', async (req, res) => {
  const { lastName, firstName, middleName, email, birthDate, password } =
    req.body;

  try {
    const user = await DiscountCard.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({
        msg: 'Пользователь с такой электронной почтой уже существует',
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();
    const newUser = await DiscountCard.create({
      lastName,
      firstName,
      middleName,
      email,
      birthDate,
      password: hash,
      activationLink,
    });
    await MailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(newUser);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      newUser: userDto,
    };
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ msg: 'Произошла ошибка при регистрации' });
  }
});

module.exports = router;
