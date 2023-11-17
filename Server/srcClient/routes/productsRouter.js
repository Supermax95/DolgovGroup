const router = require('express').Router();
const { Product } = require('../../db/models');

router.get('/admin/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      raw: true,
    });
    res.json(products);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.post('/admin/products', async (req, res) => {
  const { newProduct } = req.body;
  try {
    await Product.create({
      productName: newProduct.productName,
      promoStartDate: newProduct.promoStartDate,
      promoEndDate: newProduct.promoEndDate,
      originalPrice: newProduct.originalPrice,
      customerPrice: newProduct.customerPrice,
      employeePrice: newProduct.employeePrice,
      isNew: newProduct.isNew,
      isDiscounted: newProduct.isDiscounted,
      description: newProduct.description,
      categoryId: newProduct.categoryId,
    });

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      raw: true,
    });

    res.json(products);
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
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
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/products', async (req, res) => {
  const { newInfo } = req.body;

  try {
    await Product.update(
      {
        productName: newInfo.productName,
        promoStartDate: newInfo.promoStartDate,
        promoEndDate: newInfo.promoEndDate,
        originalPrice: newInfo.originalPrice,
        customerPrice: newInfo.customerPrice,
        employeePrice: newInfo.employeePrice,
        isNew: newInfo.isNew,
        isDiscounted: newInfo.isDiscounted,
        description: newInfo.description,
        categoryId: newInfo.categoryId,
      },
      {
        where: { id: newInfo.id },
      },
    );

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      raw: true,
    });

    res.json(products);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
