const router = require('express').Router();
const { Op } = require('sequelize');
const { DiscountCard } = require('../../db/models');

router.get('/admin/clients', async (req, res) => {
  try {
    const clients = await DiscountCard.findAll({
      where: {
        userStatus: 'Клиент',
      },
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
      ],
      raw: true,
    });
    res.json(clients);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/clients/:id', async (req, res) => {
  const clientId = req.params.id;
  const { newInfo } = req.body;
  try {
    const existingClient = await DiscountCard.findOne({
      where: {
        email: newInfo.email,
        id: { [Op.not]: clientId },
      },
    });
    if (existingClient) {
      return res
        .status(400)
        .json({ error: 'Пользователь с таким email уже существует' });
    }

    await DiscountCard.update(newInfo, {
      where: { id: clientId },
    });
    const clients = await DiscountCard.findAll({
      where: {
        userStatus: 'Клиент',
      },
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
      ],
      raw: true,
    });
    res.json(clients);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
