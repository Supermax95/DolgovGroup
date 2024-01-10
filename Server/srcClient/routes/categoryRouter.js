const router = require('express').Router();
const { Category } = require('../../db/models');

router.get('/admin/category', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['categoryName', 'ASC']],
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
    const existingCategory = await Category.findOne({
      where: { categoryName: newCategory.categoryName },
    });

    if (existingCategory) {
      res.status(400).json({
        error: 'Категория с указанным названием уже существует',
      });
    } else {
      await Category.create({
        categoryName: newCategory.categoryName,
      });
      const categories = await Category.findAll({
        order: [['categoryName', 'ASC']],
        raw: true,
      });

      res.json(categories);
    }
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
        // ['subcategory', 'ASC'],
      ],
      raw: true,
    });
    res.json(categories);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

//* даже если название категории осталось прежним у текущего id,
//* появится уведомление, что изменения внесены
router.put('/admin/category/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { newCategoryName } = req.body;

  try {
    const category = await Category.findOne({ where: { id: categoryId } });

    if (!category) {
      res.status(401).json({ message: 'Категория не найдена' });
    }

    if (newCategoryName !== category.categoryName) {
      const searchCategoryName = await Category.findOne({
        where: { categoryName: newCategoryName },
      });

      if (!searchCategoryName) {
        await category.update({ categoryName: newCategoryName });

        //! мб, сделать так, чтобы возвращал не массив всех,
        //! а одну конкретную категорию, которая изменена
        // res.status(200).json({
        //   message: 'Категория успешно изменена',
        // });

        const categories = await Category.findAll({
          order: [['categoryName', 'ASC']],
          raw: true,
        });
        res.json(categories);
      } else {
        res.status(400).json({
          error: 'Категория с указанным названием уже существует',
        });
      }
    } else {
      const categories = await Category.findAll({
        order: [['categoryName', 'ASC']],
        raw: true,
      });
      res.json(categories);
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
