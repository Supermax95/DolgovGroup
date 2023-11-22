const router = require('express').Router();
const { Subcategory } = require('../../db/models');

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
    await Subcategory.create({
      subCategoryName: newSubcategory.subCategoryName,
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
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
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
    await Subcategory.update(newInfo, {
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
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
