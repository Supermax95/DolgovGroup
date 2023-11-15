const router = require('express').Router();
const multer = require('multer');
const { Product } = require('../../db/models');

const storageProduct = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/product');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const uploadsProduct = multer({ storage: storageProduct });

router.post(
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

      res.json({ message: 'Файл зпгрузился.' });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Ошибка загрузки' });
    }
  }
);

module.exports = router;
