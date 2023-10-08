const express = require('express');

const router = express.Router();
const { DiscountCard } = require('../db/models');

router.get('/check/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
console.log(userId);

    const user = await DiscountCard.findOne({ where: { id: userId } });


    if (user.isActivated === true) {
      return res.status(200).json({ message: 'Аккаунт активирован' });
    }

    return res.status(403).json({ message: 'Аккаунт не активирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;



