const router = require('express').Router();
const { isPast, parseISO, addDays, subDays } = require('date-fns');
const { Op } = require('sequelize');
const { Product } = require('../../db/models');
const path = require('path');
const fsPromises = require('fs').promises;

router.get('/admin/products', async (req, res) => {
  try {
    // Найти и обновить продукты
    const products = await Product.findAll({
      attributes: { exclude: ['description'] },
      order: [['productName', 'ASC']],
      raw: true,
    });

    for (const product of products) {
      if (
        product.promoEndDate &&
        isPast(addDays(parseISO(product.promoEndDate), 1))
      ) {
        await Product.update(
          { isDiscounted: false },
          { where: { id: product.id } }
        );
      }
    }

    // Обновить поле photo, если оно равно null
    await Product.update(
      { photo: '/uploads/noPhoto/null.jpeg' },
      { where: { photo: null } }
    );

    // Получить обновленные продукты
    const updatedProducts = await Product.findAll({
      attributes: { exclude: ['description'] },
      order: [['productName', 'ASC']],
      raw: true,
    });

    res.json(updatedProducts);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при получении данных из базы',
    });
  }
});

router.get('/admin/currentproduct/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      raw: true,
    });

    if (!product) {
      return res.status(404).json({ error: 'Продукт не найден' });
    }

    res.json(product);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при получении данных из базы',
    });
  }
});

router.post('/admin/products', async (req, res) => {
  const { newProduct } = req.body;

  try {
    const existingProduct = await Product.findOne({
      where: { article: newProduct.article },
    });
    if (existingProduct) {
      return res.status(400).json({
        error: 'Продукт с указанным артикулом уже существует',
      });
    }

    const createdProduct = await Product.create({
      article: newProduct.article,
      productName: newProduct.productName,
      promoStartDate: newProduct.promoStartDate,
      promoEndDate: newProduct.promoEndDate,
      originalPrice: newProduct.originalPrice,
      customerPrice: newProduct.customerPrice,
      employeePrice: newProduct.employeePrice,
      isNew: newProduct.isNew,
      isDiscounted: newProduct.isDiscounted,
      description: newProduct.description,
      subcategoryId: newProduct.subcategoryId,
      invisible: newProduct.invisible,
    });

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      attributes: { exclude: ['description'] },
      raw: true,
    });

    res.json({ postId: createdProduct.id, products });
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при добавлении данных в базу',
    });
  }
});

router.delete('/admin/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    // Найдите информацию о продукте
    const product = await Product.findByPk(productId);

    // Проверьте, нужно ли удалить запись
    if (product) {
      // Сохраните путь к файлу
      const filePath = path.join(__dirname, '..', '..', product.photo);

      // Проверьте, нужно ли удалить файл
      if (product.photo !== '/uploads/noPhoto/null.jpeg') {
        // Удалите связанный файл, если он существует
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

      // Удалите запись из базы данных
      await Product.destroy({
        where: { id: productId },
      });
    } else {
      console.log('Запись не найдена');
    }

    // Получите обновленный список продуктов
    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      attributes: { exclude: ['description'] },
      raw: true,
    });

    res.json(products);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при удалении данных из базы',
    });
  }
});

router.put('/admin/products', async (req, res) => {
  const { newInfo } = req.body;

  try {
    const existingProduct = await Product.findOne({
      where: { article: newInfo.article, id: { [Op.not]: newInfo.id } },
    });

    if (existingProduct) {
      return res.status(400).json({
        error: 'Продукт с указанным артикулом уже существует',
      });
    }

    if (
      newInfo.promoEndDate &&
      isPast(subDays(parseISO(newInfo.promoEndDate), 1))
    ) {
      await Product.update(
        { isDiscounted: false },
        { where: { id: newInfo.id } }
      );
    }

    await Product.update(
      {
        article: newInfo.article,
        productName: newInfo.productName,
        promoStartDate: newInfo.promoStartDate,
        promoEndDate: newInfo.promoEndDate,
        originalPrice: newInfo.originalPrice,
        customerPrice: newInfo.customerPrice,
        employeePrice: newInfo.employeePrice,
        isNew: newInfo.isNew,
        isDiscounted: newInfo.isDiscounted,
        description: newInfo.description,
        subcategoryId: newInfo.subcategoryId,
        invisible: newInfo.invisible,
      },
      {
        where: { id: newInfo.id },
      }
    );

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      attributes: { exclude: ['description'] },
      raw: true,
    });

    res.json({ postId: newInfo.id, products });
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при обновлении данных в базе',
    });
  }
});

router.delete('/admin/products/photo/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (product && product.photo) {
      const filePath = path.join(__dirname, '..', '..', product.photo);

      if (product.photo !== '/uploads/noPhoto/null.jpeg') {
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

      await Product.update(
        { photo: '/uploads/noPhoto/null.jpeg' },
        { where: { id: productId } }
      );

      console.log(`Картинка для продукта с ID ${productId} успешно удалена`);

      const updatedProducts = await Product.findAll({
        order: [['productName', 'ASC']],
        attributes: { exclude: ['description'] },
        raw: true,
      });

      res.json(updatedProducts);
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
