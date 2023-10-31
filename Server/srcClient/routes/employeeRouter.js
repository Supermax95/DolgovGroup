const router = require('express').Router();
const { DiscountCard } = require('../../db/models');
const { Op } = require('sequelize');

router.get('/admin/employees', async (req, res) => {
  try {
    const employees = await DiscountCard.findAll({
      where: {
        userStatus: {
          [Op.not]: 'Клиент',
        },
      },
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
      ],
      raw: true,
    });
    res.json(employees);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/employees/:id', async (req, res) => {
  const employeeId = req.params.id;
  const { newInfo } = req.body;
  try {
    await DiscountCard.update(newInfo, {
      where: { id: employeeId },
    });
    const employees = await DiscountCard.findAll({
      where: {
        userStatus: {
          [Op.not]: 'Клиент',
        },
      },
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
      ],
      raw: true,
    });
    res.json(employees);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
