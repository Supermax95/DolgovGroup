const router = require('express').Router();
const { DiscountCard } = require('../db/models');

module.exports = router.get('/edit/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const dataUser = await DiscountCard.findOne({ where: { id: userId } });
    console.log('dataUser', dataUser);
    res.json(dataUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
});
