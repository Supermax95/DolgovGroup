const bcrypt = require('bcrypt');
const express = require('express');
const { DiscountCard } = require('../db/models');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { lastName, firstName, middleName, email, birthDate, password } =
    req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await DiscountCard.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({
        msg: 'Пользователь с такой электронной почтой уже существует',
      });
    }

    const newUser = await DiscountCard.create({
      lastName,
      firstName,
      middleName,
      email,
      birthDate,
      password: hash,
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ msg: 'Произошла ошибка при регистрации' });
  }
});

module.exports = router;
