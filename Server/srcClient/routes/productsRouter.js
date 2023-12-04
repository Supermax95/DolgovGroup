const router = require('express').Router();
const { isPast, parseISO, addDays, subDays } = require('date-fns');
const { Op } = require('sequelize');
const { Product } = require('../../db/models');

router.get('/admin/products', async (req, res) => {
  try {
    const products = await Product.findAll({
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

    const updatedProducts = await Product.findAll({
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
      visible: newProduct.visible,
    });

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
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
    await Product.destroy({
      where: { id: productId },
    });

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
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
        visible: newInfo.visible,
      },
      {
        where: { id: newInfo.id },
      }
    );

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
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
module.exports = router;
