const router = require('express').Router();
const { Subcategory, Category } = require('../../db/models');

router.get('/admin/subcategory', async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      order: [
        ['subcategoryName', 'ASC'],
        // ['subcategory', 'ASC'],
      ],
      raw: true,
    });
    res.json(subcategories);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.post('/admin/subcategory', async (req, res) => {
  const { newSubcategory } = req.body;

  try {
    const category = await Category.findOne({
      where: { categoryName: newSubcategory.categoryName },
    });

    if (!category) {
      return res.status(400).json({ error: 'Категория не найдена' });
    }

    await Subcategory.create({
      subCategoryName: newSubcategory.subCategoryName,
      categoryId: category.id,
    });
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
  const { newInfo } = req.body;
  try {
    const category = await Category.findOne({
      where: { categoryName: newInfo.categoryName },
    });

    if (!category) {
      return res.status(400).json({ error: 'Категория не найдена' });
    }

    await Subcategory.update(newInfo, {
      where: { id: subcategoryId },
    });

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
