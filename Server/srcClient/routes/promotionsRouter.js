const router = require('express').Router();
const { isPast, parseISO, addDays, subDays } = require('date-fns');
const { Op } = require('sequelize');
const { Promotion } = require('../../db/models');

router.get('/admin/promotions', async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      order: [['dateStart', 'DESC']],
      raw: true,
    });

    for (const promotion of promotions) {
      if (
        promotion.dateEnd &&
        isPast(addDays(parseISO(promotion.dateEnd), 1))
      ) {
        await Promotion.update(
          { invisible: true, carousel: false },
          { where: { id: promotion.id } }
        );
      }
    }

    const updatedPromotions = await Promotion.findAll({
      order: [
        ['dateStart', 'DESC'],
        ['title', 'ASC'],
      ],
      raw: true,
    });

    res.json(updatedPromotions);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при получении данных из базы',
    });
  }
});

router.post('/admin/promotions', async (req, res) => {
  const { newPromotion } = req.body;

  try {
    const existingPromotion = await Promotion.findOne({
      where: { title: newPromotion.title },
    });
    if (existingPromotion) {
      return res.status(400).json({
        error: 'Акция с указанным названием уже существует',
      });
    }

    const createdPromotion = await Promotion.create({
      title: newPromotion.title,
      description: newPromotion.description,
      dateStart: newPromotion.dateStart,
      dateEnd: newPromotion.dateEnd,
      carousel: newPromotion.carousel,
      invisible: newPromotion.invisible,
    });

    const promotions = await Promotion.findAll({
      order: [
        ['dateStart', 'DESC'],
        ['title', 'ASC'],
      ],
      raw: true,
    });
    res.json({ postId: createdPromotion.id, promotions });
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при добавлении данных в базу',
    });
  }
});

router.delete('/admin/promotions/:id', async (req, res) => {
  const promotionId = req.params.id;
  try {
    await Promotion.destroy({
      where: { id: promotionId },
    });

    const promotions = await Promotion.findAll({
      order: [['dateStart', 'DESC']],
      raw: true,
    });

    res.json(promotions);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при удалении данных из базы',
    });
  }
});

router.put('/admin/promotions', async (req, res) => {
  const { newInfo } = req.body;

  try {
    const existingPromotion = await Promotion.findOne({
      where: { title: newInfo.title, id: { [Op.not]: newInfo.id } },
    });

    if (existingPromotion) {
      return res.status(400).json({
        error: 'Акция с указанным названием уже существует',
      });
    }

    if (newInfo.dateEnd && isPast(subDays(parseISO(newInfo.promoEndDate), 1))) {
      await Promotion.update(
        { invisible: true },
        { where: { id: newInfo.id } }
      );
    }

    await Promotion.update(
      {
        title: newInfo.title,
        description: newInfo.description,
        dateStart: newInfo.dateStart,
        dateEnd: newInfo.dateEnd,
        carousel: newInfo.carousel,
        invisible: newInfo.invisible,
      },
      {
        where: { id: newInfo.id },
      }
    );

    const promotions = await Promotion.findAll({
      order: [
        ['dateStart', 'DESC'],
        ['title', 'ASC'],
      ],
      raw: true,
    });
    res.json({ postId: newInfo.id, promotions });
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при обновлении данных в базе',
    });
  }
});
module.exports = router;
