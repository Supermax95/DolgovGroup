const router = require('express').Router();
const { Op } = require('sequelize');
const { Law } = require('../../db/models');
const fs = require('fs');
const path = require('path');


router.get('/admin/laws', async (req, res) => {
  try {
    const laws = await Law.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });

    res.json(laws);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при получении данных из базы',
    });
  }
});

router.post('/admin/laws', async (req, res) => {
  const { newLaw } = req.body;

  try {
    const existingLaw = await Law.findOne({
      where: { title: newLaw.title },
    });
    if (existingLaw) {
      return res.status(400).json({
        error: 'Документ с таким названием уже существует',
      });
    }

    const createdLaw = await Law.create({
      title: newLaw.title,
      description: newLaw.description,
      dateFrom: newLaw.dateFrom,
    });

    const laws = await Law.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });

    res.json({ postId: createdLaw.id, laws });
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при добавлении данных в базу',
    });
  }
});

router.delete('/admin/laws/:id', async (req, res) => {
  const lawId = req.params.id;
  try {
    await Law.destroy({
      where: { id: lawId },
    });

    const laws = await Law.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });
    console.log(laws);
    res.json(laws);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при удалении данных из базы',
    });
  }
});


router.put('/admin/laws', async (req, res) => {
  const { newInfo } = req.body;

  try {
    const existingLaw = await Law.findOne({
      where: { title: newInfo.title, id: { [Op.not]: newInfo.id } },
    });

    if (existingLaw) {
      return res.status(400).json({
        error: 'Документ с таким названием уже существует',
      });
    }
    await Law.update(
      {
        title: newInfo.title,
        description: newInfo.description,
        dateFrom: newInfo.dateFrom,
      },
      {
        where: { id: newInfo.id },
      }
    );

    const laws = await Law.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });

    res.json({ postId: newInfo.id, laws });
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при обновлении данных в базе',
    });
  }
});
module.exports = router;
