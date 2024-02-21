const router = require('express').Router();
const { isPast, parseISO, addDays, subDays } = require('date-fns');
const { Op } = require('sequelize');
const { Promotion } = require('../../db/models');
const path = require('path');
const fsPromises = require('fs').promises;

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
          { invisible: true },
          { where: { id: promotion.id } }
        );
      }
    }

    await Promotion.update(
      { photo: '/uploads/noPhoto/null.png' },
      { where: { [Op.or]: [{ photo: null }, { photo: '' }] } }
    );

    const updatedPromotions = await Promotion.findAll({
      attributes: { exclude: ['description'] },
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

router.get('/admin/currentpromotion/:id', async (req, res) => {
  const promotionId = req.params.id;
  try {
    const promotion = await Promotion.findByPk(promotionId, {
      raw: true,
    });

    if (!promotion) {
      return res.status(404).json({ error: 'Акция не найдена' });
    }

    res.json(promotion);
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
      attributes: { exclude: ['description'] },
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
    // Найдите информацию о промо-акции
    const promotion = await Promotion.findByPk(promotionId);

    // Удалите запись из базы данных
    await Promotion.destroy({
      where: { id: promotionId },
    });

    // Удалите связанный файл, если он существует
    if (promotion && promotion.photo) {
      const filePath = path.join(__dirname, '..', '..', promotion.photo);
      if (promotion.photo !== '/uploads/noPhoto/null.png') {
        const fileExists = await fsPromises
          .access(filePath)
          .then(() => true)
          .catch(() => false);

        if (fileExists) {
          // Удалите файл
          await fsPromises.unlink(filePath);
          console.log(`Файл ${filePath} успешно удален`);
        } else {
          console.log(`Файл ${filePath} не существует`);
        }
      }
    }

    // Получите обновленный список промо-акций
    const promotions = await Promotion.findAll({
      attributes: { exclude: ['description'] },
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
      attributes: { exclude: ['description'] },
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
router.delete('/admin/promotions/photo/:id', async (req, res) => {
  const promoId = req.params.id;

  try {
    const promotion = await Promotion.findByPk(promoId);
    if (promotion && promotion.photo) {
      const filePath = path.join(__dirname, '..', '..', promotion.photo);

      if (promotion.photo !== '/uploads/noPhoto/null.png') {
        const fileExists = await fsPromises
          .access(filePath)
          .then(() => true)
          .catch(() => false);

        if (fileExists) {
          await fsPromises.unlink(filePath);
          console.log(`Файл ${filePath} успешно удален`);
        } else {
          console.log(`Файл ${filePath} не существует`);
        }
      }

      await Promotion.update(
        { photo: '/uploads/noPhoto/null.png' },
        { where: { id: promoId } }
      );

      console.log(`Картинка для продукта с ID ${promoId} успешно удалена`);

      const updatedPromotions = await Promotion.findAll({
        attributes: { exclude: ['description'] },
        order: [
          ['dateStart', 'DESC'],
          ['title', 'ASC'],
        ],
        raw: true,
      });

      res.json(updatedPromotions);
    } else {
      console.log('Промо или его картинка не найдены');
      res.status(404).json({ error: 'Промо или его картинка не найдены' });
    }
  } catch (error) {
    console.error('Ошибка при удалении картинки промо', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при удалении картинки промо',
    });
  }
});

module.exports = router;
