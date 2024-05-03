const router = require('express').Router();
const fsPromises = require('fs').promises;
const { isPast, parseISO, addDays, subDays } = require('date-fns');
const path = require('path');
const axios = require('axios');
const cron = require('node-cron');
const { Op } = require('sequelize');
const { Product } = require('../../db/models');
const checkUser = require('../middlewares/auth-middleware-client');

router.get('/admin/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['description'] },
      order: [['productName', 'ASC']],
      raw: true,
    });

    for (const product of products) {
      if (
        product.customerPrice !== product.originalPrice &&
        product.promoEndDate &&
        isPast(addDays(parseISO(product.promoEndDate), 1))
      ) {
        await Product.update(
          { isDiscounted: false, customerPrice: product.originalPrice },
          { where: { id: product.id } }
        );
      } else if (
        product.customerPrice !== product.originalPrice &&
        !product.isDiscounted
      ) {
        await Product.update(
          { customerPrice: product.originalPrice },
          { where: { id: product.id } }
        );
      }
    }

    await Product.update(
      { photo: '/uploads/noPhoto/null.png' },
      { where: { [Op.or]: [{ photo: null }, { photo: '' }] } }
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

const task = cron.schedule('00 01 * * *', async () => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['description'] },
      order: [['productName', 'ASC']],
      raw: true,
    });

    const emptyResponseProducts = [];

    for (const product of products) {
      const credentials = 'Lichkab:Ko9dyfum';
      const base64Credentials = Buffer.from(credentials).toString('base64');
      const response = await axios.get(
        `http://retail.dolgovagro.ru/retail2020/hs/loyaltyservice/getprices?Code=${product.article}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );
      try {
        if (response.data.length > 0) {
          const newOriginalPrice = parseFloat(
            response.data[0].Price.replace(',', '.')
          );

          if (!isNaN(newOriginalPrice)) {
            await Product.update(
              {
                originalPrice: newOriginalPrice,
              },
              { where: { article: product.article } }
            );
          } else {
            console.error('Ошибка: newOriginalPrice не является числом.');
          }
        } else {
          console.error(
            'Ошибка: response.data пустой массив для продукта с кодом номенклатуры',
            product.article
          );
          emptyResponseProducts.push(product);
        }
      } catch (error) {
        console.error(
          '===========>'`Ошибка при обработке продукта с кодом номенклатуры ${product.article}:`,
          error
        );
      }
    }

    // Выводим продукты с пустыми ответами
    emptyResponseProducts.forEach((product) => {
      console.log(
        `Продукт с кодом номенклатуры ${product.article} имеет пустой массив в ответе.`
      );
    });

    // Дополнительные обновления (например, обновление поля photo)
  } catch (error) {
    console.error('Ошибка при выполнении плановой задачи', error);
  }
});
task.start();

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

router.post('/admin/products', checkUser, async (req, res) => {
  const { newProduct } = req.body;
  try {
    const existingProduct = await Product.findOne({
      where: { article: newProduct.article },
    });
    if (existingProduct) {
      return res.status(400).json({
        error: 'Продукт с указанным кодом номенклатуры уже существует',
      });
    }
    if (newProduct.customerPrice == 0) {
      newProduct.customerPrice = newProduct.originalPrice;
    }
    if (newProduct.employeePrice == 0) {
      newProduct.employeePrice = newProduct.originalPrice;
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

router.delete('/admin/products/:id', checkUser, async (req, res) => {
  const productId = req.params.id;
  try {
    // Найдите информацию о продукте
    const product = await Product.findByPk(productId);

    // Проверьте, нужно ли удалить запись
    if (product) {
      // Сохраните путь к файлу
      const filePath = path.join(__dirname, '..', '..', product.photo);

      // Проверьте, нужно ли удалить файл
      if (product.photo !== '/uploads/noPhoto/null.png') {
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

router.put('/admin/products', checkUser, async (req, res) => {
  const { newInfo } = req.body;

  try {
    const existingProduct = await Product.findOne({
      where: { article: newInfo.article, id: { [Op.not]: newInfo.id } },
    });

    if (existingProduct) {
      return res.status(400).json({
        error: 'Продукт с указанным кодом номенклатуры уже существует',
      });
    }
    if (newInfo.customerPrice == 0) {
      newInfo.customerPrice = newInfo.originalPrice;
    }
    if (newInfo.employeePrice == 0) {
      newInfo.employeePrice = newInfo.originalPrice;
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

router.delete('/admin/products/photo/:id', checkUser, async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (product && product.photo) {
      const filePath = path.join(__dirname, '..', '..', product.photo);

      if (product.photo !== '/uploads/noPhoto/null.png') {
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
        { photo: '/uploads/noPhoto/null.png' },
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
