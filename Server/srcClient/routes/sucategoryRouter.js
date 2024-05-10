const router = require('express').Router();
const { Subcategory, Category } = require('../../db/models');
const checkUser = require('../middlewares/auth-middleware-client');

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

router.post('/admin/subcategory', checkUser, async (req, res) => {
  const { newSubcategory, categoryId } = req.body;

  try {
    const existingSubategory = await Subcategory.findOne({
      where: { subcategoryName: newSubcategory },
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
        subcategoryName: newSubcategory,
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

router.delete('/admin/subcategory/:id', checkUser, async (req, res) => {
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

//* даже если название подкатегории осталось прежним у текущего id,
//* появится уведомление, что изменения внесены
router.put('/admin/subcategory/:id', checkUser, async (req, res) => {
  const subcategoryId = req.params.id;
  const { newSubcategoryName } = req.body;
  console.log('newSubcategoryName', newSubcategoryName);

  try {
    const subcategory = await Subcategory.findOne({
      where: { id: subcategoryId },
    });

    if (newSubcategoryName !== subcategory.subcategoryName) {
      const searchSubcategoryName = await Subcategory.findOne({
        where: { subcategoryName: newSubcategoryName },
      });

      if (!searchSubcategoryName) {
        await subcategory.update({
          subcategoryName: newSubcategoryName,
        });

        const subcategories = await Subcategory.findAll({
          order: [['subcategoryName', 'ASC']],
          raw: true,
        });

        res.json(subcategories);
      } else {
        res
          .status(400)
          .json({ error: 'Подкатегория с указанным названием уже существует' });
      }
    } else {
      const subcategories = await Subcategory.findAll({
        order: [['subcategoryName', 'ASC']],
        raw: true,
      });

      res.json(subcategories);
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
