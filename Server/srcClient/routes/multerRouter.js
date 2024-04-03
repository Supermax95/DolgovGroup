const router = require('express').Router();
const multer = require('multer');
const { Product, Promotion, Law, Category } = require('../../db/models');
const checkUser = require('./middlewares/auth-middleware-client');

const storageProduct = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/product');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const uploadsProduct = multer({ storage: storageProduct });

const storagePromotion = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/promotion');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const uploadsPromotion = multer({ storage: storagePromotion });

const storageDocument = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/document');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const uploadsDocument = multer({ storage: storageDocument });

const storageCategory = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/category');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const uploadsCategory = multer({ storage: storageCategory });

router.put(
  '/admin/productsPhoto/:id',
  uploadsProduct.single('file'),
  checkUser,
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;
    try {
      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ error: 'Продукт не найден' });
      } else {
        await product.update(
          { photo: `/uploads/product/${originalname}` },
          { where: { id } }
        );

        res.json({ message: 'Файл загрузился.' });
      }
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Ошибка загрузки' });
    }
  }
);

router.put(
  '/admin/promotionsPhoto/:id',
  uploadsPromotion.single('file'),
  checkUser,
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;
    try {
      const promotion = await Promotion.findByPk(id);

      if (!promotion) {
        res.status(404).json({ error: 'Акция не найдена' });
      } else {
        await Promotion.update(
          { photo: `/uploads/promotion/${originalname}` },
          { where: { id } }
        );

        res.json({ message: 'Файл загрузился.' });
      }
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Ошибка загрузки' });
    }
  }
);

router.put(
  '/admin/documentFile/:id',
  uploadsDocument.single('file'),
  checkUser,
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;
    try {
      await Law.update(
        { documentLink: `/uploads/document/${originalname}` },
        { where: { id } }
      );
      const laws = await Law.findAll({
        order: [['title', 'ASC']],
        raw: true,
      });

      res.json({ laws, message: 'Файл загрузился.' });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Ошибка загрузки' });
    }
  }
);

router.put(
  '/categoryImg/:id',
  uploadsCategory.single('file'),
  checkUser,
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;
    try {
      await Category.update(
        { img: `/uploads/category/${originalname}` },
        { where: { id } }
      );
      const category = await Category.findAll({
        order: [['categoryName', 'ASC']],
        raw: true,
      });

      res.json({ category, message: 'Файл загрузился.' });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Ошибка загрузки' });
    }
  }
);

module.exports = router;
