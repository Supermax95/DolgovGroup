const router = require('express').Router();
const multer = require('multer');
const { Product, Promotion, Law } = require('../../db/models');

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

router.put(
  '/admin/productsPhoto/:id',
  uploadsProduct.single('file'),
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;
    try {
      await Product.update(
        { photo: `/uploads/product/${originalname}` },
        { where: { id } }
      );

      res.json({ message: 'Файл загрузился.' });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Ошибка загрузки' });
    }
  }
);

router.put(
  '/admin/promotionsPhoto/:id',
  uploadsPromotion.single('file'),
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;
    try {
      await Promotion.update(
        { photo: `/uploads/promotion/${originalname}` },
        { where: { id } }
      );

      res.json({ message: 'Файл загрузился.' });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Ошибка загрузки' });
    }
  }
);

router.put(
  '/admin/documentFile/:id',
  uploadsDocument.single('file'),
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

module.exports = router;
