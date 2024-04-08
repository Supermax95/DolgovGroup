const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fsPromises = require('fs').promises;
const { Product, Promotion, Law, Category } = require('../../db/models');
const checkUser = require('../middlewares/auth-middleware-client');

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

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Продукт не найден' });
    }

    try {
      const newPhotoPath = `/uploads/product/${originalname}`;

      // Проверяем, существует ли уже файл с таким путем в базе данных
      const existingProduct = await Product.findOne({
        where: { photo: newPhotoPath },
      });

      if (existingProduct) {
        return res
          .status(400)
          .json({ error: 'Файл с таким именем уже существует' });
      }

      // Создаем путь к файлу
      const filePath = path.join(__dirname, '..', '..', product.photo);

      // Проверяем существование файла
      const fileExists = await fsPromises
        .access(filePath)
        .then(() => true)
        .catch(() => false);

      if (fileExists && product.photo !== '/uploads/noPhoto/null.png') {
        // Удаляем файл, только если путь к нему не равен /uploads/noPhoto/null.png
        await fsPromises.unlink(filePath);
        console.log(`Файл ${filePath} успешно удален`);
      } else {
        console.log(
          `Файл ${filePath} не существует или его удаление не требуется`
        );
      }

      // Обновляем путь к файлу в базе данных
      await product.update({ photo: newPhotoPath }, { where: { id } });

      res.json({ message: 'Файл загрузился.' });
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
