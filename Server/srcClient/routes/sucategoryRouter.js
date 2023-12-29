const router = require('express').Router();
const { Subcategory, Category } = require('../../db/models');

router.get('/admin/subcategory', async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      order: [['subcategoryName', 'ASC']],
      raw: true,
    });
    res.json(subcategories);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.post('/admin/subcategory', async (req, res) => {
  const { newSubcategory, categoryId } = req.body;

  try {
    const existingSubategory = await Subcategory.findOne({
      where: { subcategoryName: Subcategory.subcategoryName },
    });
    if (existingSubategory) {
      return res.status(400).json({
        error: 'Подкатегория с указанным названием уже существует',
      });
    }
    const category = await Category.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      res.status(400).json({ error: 'Категория не найдена' });
    } else {
      await Subcategory.create({
        subcategoryName: newSubcategory.subcategoryName,
        categoryId,
      });
    }

    const subcategories = await Subcategory.findAll({
      order: [['subcategoryName', 'ASC']],
      raw: true,
    });
    res.json(subcategories);
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

router.delete('/admin/subcategory/:id', async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    await Subcategory.destroy({
      where: { id: subcategoryId },
    });
    const subcategories = await Subcategory.findAll({
      order: [
        ['subcategoryName', 'ASC'],
        // ['subcategory', 'ASC'],
      ],
      raw: true,
    });
    res.json(subcategories);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/subcategory/:id', async (req, res) => {
  const subcategoryId = req.params.id;
  const { newSubcategoryName } = req.body;

  try {
    const subcategory = await Subcategory.findOne({
      where: { id: subcategoryId },
    });

    if (!subcategory) {
      res.status(400).json({ error: 'Подкатегория не найдена' });
    } else {
      await subcategory.update({
        subcategoryName: newSubcategoryName,
      });
    }

    const subcategories = await Subcategory.findAll({
      order: [['subcategoryName', 'ASC']],
      raw: true,
    });

    res.json(subcategories);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
