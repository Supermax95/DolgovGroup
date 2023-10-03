const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Discount_Cards } = require('../db/models');

router.post('/register', async (req, res) => {
  const { last_name, first_name, middle_name, email, birth_date, password } =
    req.body;

  try {
    const user = await Discount_Cards.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({
        msg: 'Пользователь с такой электронной почтой уже существует',
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await Discount_Cards.create({
      lastName,
      first_name,
      middle_name,
      email,
      birth_date,
      password: hash,
    });

    req.session.save(() => {
      res.status(201).json({
        msg: 'Пользователь успешно зарегистрирован',
        email: newUser.email,
      });
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ msg: 'Произошла ошибка при регистрации' });
  }
});

module.exports = router;
