const router = require('express').Router();
const moment = require('moment');
const { DiscountCard } = require('../db/models');

module.exports = router.get('/edit/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const dataUser = await DiscountCard.findOne({ where: { id: userId } });

    if (dataUser && dataUser.birthDate) {
      dataUser.dataValues.birthDate = moment(
        dataUser.dataValues.birthDate
      ).format('DD-MM-YYYY');
    }
    res.json(dataUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
});
