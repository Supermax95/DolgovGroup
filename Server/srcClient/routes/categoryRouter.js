const router = require('express').Router();
const { Category } = require('../../db/models');

router.get('/admin/category', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [
        ['categoryName', 'ASC'],
        ['subcategory', 'ASC'],
      ],
      raw: true,
    });
    res.json(categories);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.post('/admin/category', async (req, res) => {
  const { newCategory } = req.body;

  try {
    await Category.create({
      categoryName: newCategory.categoryName,
      subcategory: newCategory.subcategory,
    });

    const categories = await Category.findAll({
      order: [
        ['categoryName', 'ASC'],
        ['subcategory', 'ASC'],
      ],
      raw: true,
    });

    res.json(categories);
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.delete('/admin/category/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.destroy({
      where: { id: categoryId },
    });
    const categories = await Category.findAll({
      order: [
        ['categoryName', 'ASC'],
        ['subcategory', 'ASC'],
      ],
      raw: true,
    });
    res.json(categories);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/category/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { newInfo } = req.body;
  try {
    await Category.update(newInfo, {
      where: { id: categoryId },
    });
    const categories = await Category.findAll({
      order: [
        ['categoryName', 'ASC'],
        ['subcategory', 'ASC'],
      ],
      raw: true,
    });
    res.json(categories);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
