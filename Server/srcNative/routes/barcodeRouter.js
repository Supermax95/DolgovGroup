const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { DiscountCard } = require('../../db/models');

module.exports = router.get('/barcode', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Пользователь не авторизован' });
    }
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const userData = await DiscountCard.findOne({ where: { id: user.id } });

    res.json({
      barcode: userData.barcode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
});
