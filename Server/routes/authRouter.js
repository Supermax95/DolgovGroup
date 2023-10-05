const router = require('express').Router();
const bcrypt = require('bcrypt');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { generateToken } = require('../middlewares/authMiddleware');
const { DiscountCard } = require('../db/models');

router.post('/login', authenticateJWT, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await DiscountCard.findOne({ where: { email } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);

      if (checkPass) {
        const token = generateToken(user.email);
        console.log('========>', user.email);

        res.status(200).json({
          msg: 'Пользователь авторизован',
          email: user.email,
          token,
        });
      } else {
        res.status(401).json({
          msg: 'Неправильный пароль',
        });
      }
    } else {
      res.status(404).json({
        msg: 'Пользователь не найден',
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Что-то пошло не так',
      error: error.message,
    });
  }
});

module.exports = router;
