const router = require('express').Router();
const { Product, Subcategory } = require('../../db/models');

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
    const subcategory = await Subcategory.findOne({
      where: { subcategoryName: newProduct.subcategoryName },
    });

    if (!subcategory) {
      return res.status(400).json({ error: 'Подкатегория не найдена' });
    }

    const createdProduct = await Product.create({
      productName: newProduct.productName,
      promoStartDate: newProduct.promoStartDate,
      promoEndDate: newProduct.promoEndDate,
      originalPrice: newProduct.originalPrice,
      customerPrice: newProduct.customerPrice,
      employeePrice: newProduct.employeePrice,
      isNew: newProduct.isNew,
      isDiscounted: newProduct.isDiscounted,
      description: newProduct.description,
      subcategoryId: subcategory.id,
    });

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      raw: true,
    });

    res.json({ postId: createdProduct.id, products });
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
    const subcategory = await Subcategory.findOne({
      where: { subcategoryName: newInfo.subcategoryName },
    });

    if (!subcategory) {
      return res.status(400).json({ error: 'Подкатегория не найдена' });
    }

    const [updatedRowsCount] = await Product.update(
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
        subcategoryId: subcategory.id,
      },
      {
        where: { id: newInfo.id },
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Продукт не найден' });
    }

    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      raw: true,
    });

    res.json({ postId: newInfo.id, products });
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
