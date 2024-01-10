const router = require('express').Router();
const { Op } = require('sequelize');
const fsPromises = require('fs/promises');
const path = require('path');
const { Law } = require('../../db/models');

router.get('/admin/laws', async (req, res) => {
  try {
    const laws = await Law.findAll({
      attributes: { exclude: ['description'] },
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

router.get('/admin/currentlaw/:id', async (req, res) => {
  const lawId = req.params.id;
  try {
    const law = await Law.findByPk(lawId, {
      raw: true,
    });

    if (!law) {
      return res.status(404).json({ error: 'Закон не найден' });
    }

    res.json(law);
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
    // Найдите информацию о законе
    const law = await Law.findByPk(lawId);

    // Удалите запись из базы данных
    await Law.destroy({
      where: { id: lawId },
    });

    // Удалите связанный файл, если он существует
    if (law && law.documentLink) {
      const filePath = path.join(__dirname, '..', '..', law.documentLink);

      // Проверьте, существует ли файл перед удалением
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

    // Получите обновленный список законов
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
router.delete('/admin/laws/doc/:id', async (req, res) => {
  const lawId = req.params.id;

  try {
    const law = await Law.findByPk(lawId);

    if (law && law.documentLink) {
      const filePath = path.join(__dirname, '..', '..', law.documentLink);

      if (law.documentLink !== null) {
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

      await Law.update({ documentLink: null }, { where: { id: lawId } });

      console.log(`Документ с ID ${lawId} успешно удалена`);

      const updatedLaws = await Law.findAll({
        order: [['title', 'ASC']],
        raw: true,
      });

      res.json(updatedLaws);
    } else {
      console.log('Продукт или его картинка не найдены');
      res.status(404).json({ error: 'Продукт или его картинка не найдены' });
    }
  } catch (error) {
    console.error('Ошибка при удалении картинки продукта', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при удалении картинки продукта',
    });
  }
});

module.exports = router;
