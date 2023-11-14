const router = require('express').Router();
const multer = require('multer');
const transliterate = require('transliterate');
const { Product } = require('../../db/models');

const storageProduct = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/product');
  },
  filename(req, file, cb) {
    const transliteratedName = transliterate(file.originalname);
    cb(null, `${transliteratedName}`);
  },
});

const uploadsProduct = multer({ storage: storageProduct });

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

router.post(
  '/admin/products',
  uploadsProduct.single('file'),
  async (req, res) => {
    const { newProduct } = req.body;
    const originalname = req.file.filename;
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
        photo: `/uploads/product/${originalname}`,
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
  }
);

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

router.put('/admin/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { newInfo } = req.body;

  try {
    await Product.update(newInfo, {
      where: { id: productId },
    });

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
