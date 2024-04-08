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

// router.put(
//   '/admin/productsPhoto/:id',
//   uploadsProduct.single('file'),
//   checkUser,
//   async (req, res) => {
//     const { id } = req.params;

//     const originalname = req.file.filename;

//     const product = await Product.findByPk(id);

//     if (!product) {
//       return res.status(404).json({ error: 'Продукт не найден' });
//     }

//     try {
//       const newPhotoPath = `/uploads/product/${originalname}`;

//       // Проверяем, существует ли уже файл с таким путем в базе данных
//       const existingProduct = await Product.findOne({
//         where: { photo: newPhotoPath },
//       });

//       if (existingProduct) {
//         return res
//           .status(400)
//           .json({ error: 'Файл с таким именем уже существует' });
//       }

//       // Создаем путь к файлу
//       const filePath = path.join(__dirname, '..', '..', product.photo);

//       // Проверяем существование файла
//       const fileExists = await fsPromises
//         .access(filePath)
//         .then(() => true)
//         .catch(() => false);

//       if (fileExists && product.photo !== '/uploads/noPhoto/null.png') {
//         // Удаляем файл, только если путь к нему не равен /uploads/noPhoto/null.png
//         await fsPromises.unlink(filePath);
//         console.log(`Файл ${filePath} успешно удален`);
//       } else {
//         console.log(
//           `Файл ${filePath} не существует или его удаление не требуется`
//         );
//       }

//       // Обновляем путь к файлу в базе данных
//       await product.update({ photo: newPhotoPath }, { where: { id } });

//       res.json({ message: 'Файл загрузился.' });
//     } catch (error) {
//       console.log('error', error);
//       res.status(500).json({ error: 'Ошибка загрузки' });
//     }
//   }
// );

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
    console.log('hell');
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

      // Если у продукта уже есть фотография и это не /uploads/noPhoto/null.png,
      // то удаляем старый файл
      if (product.photo && product.photo !== '/uploads/noPhoto/null.png') {
        const filePath = path.join(__dirname, '..', '..', product.photo);

        // Проверяем существование файла и удаляем его
        const fileExists = await fsPromises
          .access(filePath)
          .then(() => true)
          .catch(() => false);

        if (fileExists) {
          await fsPromises.unlink(filePath);
          console.log(`Файл ${filePath} успешно удален`);
        } else {
          console.log(
            `Файл ${filePath} не существует или удаление не требуется`
          );
        }
      }

      // Обновляем путь к файлу в базе данных
      await product.update({ photo: newPhotoPath });

      res.json({ message: 'Файл загружен успешно.' });
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      res.status(500).json({ error: 'Ошибка загрузки файла' });
    }
  }
);

// router.put(
//   '/admin/promotionsPhoto/:id',
//   uploadsPromotion.single('file'),
//   checkUser,
//   async (req, res) => {
//     const { id } = req.params;
//     const originalname = req.file.filename;
//     try {
//       const promotion = await Promotion.findByPk(id);

//       if (!promotion) {
//         res.status(404).json({ error: 'Акция не найдена' });
//       } else {
//         await Promotion.update(
//           { photo: `/uploads/promotion/${originalname}` },
//           { where: { id } }
//         );

//         res.json({ message: 'Файл загрузился.' });
//       }
//     } catch (error) {
//       console.log('error', error);
//       res.status(500).json({ message: 'Ошибка загрузки' });
//     }
//   }
// );

router.put(
  '/admin/promotionsPhoto/:id',
  uploadsPromotion.single('file'),
  checkUser,
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;

    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ error: 'Акция не найдена' });
    }
    try {
      const newPhotoPath = `/uploads/promotion/${originalname}`;
      // Если у акции уже есть фотография, то проверяем и удаляем старый файл
      const existingPromotion = await Promotion.findOne({
        where: { photo: newPhotoPath },
      });

      if (existingPromotion) {
        return res
          .status(400)
          .json({ error: 'Файл с таким именем уже существует' });
      }
      if (promotion.photo && promotion.photo !== '/uploads/noPhoto/null.png') {
        console.log('promotion.photo', promotion.photo);
        const filePath = path.join(__dirname, '..', '..', promotion.photo);
        const fileExists = await fsPromises
          .access(filePath)
          .then(() => true)
          .catch(() => false);

        if (fileExists) {
          await fsPromises.unlink(filePath);
          console.log(`Файл ${filePath} успешно удален`);
        } else {
          console.log(
            `Файл ${filePath} не существует или удаление не требуется`
          );
        }
      }

      // Обновляем путь к фотографии акции в базе данных
      await Promotion.update({ photo: newPhotoPath }, { where: { id } });

      res.json({ message: 'Файл загружен успешно.' });
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      res.status(500).json({ error: 'Ошибка загрузки файла' });
    }
  }
);

// router.put(
//   '/admin/documentFile/:id',
//   uploadsDocument.single('file'),
//   checkUser,
//   async (req, res) => {
//     const { id } = req.params;
//     const originalname = req.file.filename;
//     try {
//       await Law.update(
//         { documentLink: `/uploads/document/${originalname}` },
//         { where: { id } }
//       );
//       const laws = await Law.findAll({
//         order: [['title', 'ASC']],
//         raw: true,
//       });

//       res.json({ laws, message: 'Файл загрузился.' });
//     } catch (error) {
//       console.log('error', error);
//       res.status(500).json({ message: 'Ошибка загрузки' });
//     }
//   }
// );

// router.put(
//   '/categoryImg/:id',
//   uploadsCategory.single('file'),
//   checkUser,
//   async (req, res) => {
//     const { id } = req.params;
//     const originalname = req.file.filename;
//     try {
//       await Category.update(
//         { img: `/uploads/category/${originalname}` },
//         { where: { id } }
//       );
//       const category = await Category.findAll({
//         order: [['categoryName', 'ASC']],
//         raw: true,
//       });

//       res.json({ category, message: 'Файл загрузился.' });
//     } catch (error) {
//       console.log('error', error);
//       res.status(500).json({ message: 'Ошибка загрузки' });
//     }
//   }
// );

router.put(
  '/admin/documentFile/:id',
  uploadsDocument.single('file'),
  checkUser,
  async (req, res) => {
    const { id } = req.params;
    const originalname = req.file.filename;
    try {
      const law = await Law.findByPk(id);
      if (!law) {
        return res.status(404).json({ error: 'Документ не найден' });
      }

      const newDocumentLink = `/uploads/document/${originalname}`;

      // Проверяем, существует ли уже документ с таким путем в базе данных
      const existingLaw = await Law.findOne({
        where: { documentLink: newDocumentLink },
      });

      if (existingLaw) {
        return res
          .status(400)
          .json({ error: 'Документ с таким именем уже существует' });
      }

      // Удаляем старый файл, если он существует и его путь не является стандартным
      if (
        law.documentLink &&
        law.documentLink !== '/uploads/noPhoto/null.png'
      ) {
        const filePath = path.join(__dirname, '..', '..', law.documentLink);
        const fileExists = await fsPromises
          .access(filePath)
          .then(() => true)
          .catch(() => false);

        if (fileExists) {
          await fsPromises.unlink(filePath);
          console.log(`Старый файл ${filePath} успешно удален`);
        }
      }

      // Обновляем путь к документу в базе данных
      await Law.update({ documentLink: newDocumentLink }, { where: { id } });

      const laws = await Law.findAll({
        order: [['title', 'ASC']],
        raw: true,
      });

      res.json({ laws, message: 'Файл загружен успешно.' });
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      res.status(500).json({ error: 'Ошибка загрузки файла' });
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
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Категория не найдена' });
      }

      const newImgPath = `/uploads/category/${originalname}`;

      const existingCategoryImg = await Category.findOne({
        where: { img: newImgPath },
      });
      if (existingCategoryImg) {
        return res
          .status(400)
          .json({ error: 'Файл с таким именем уже существует' });
      }

      // Удаляем старый файл изображения категории, если он существует и не равен стандартному значению
      if (category.img && category.img !== '/uploads/noPhoto/null.png') {
        const filePath = path.join(__dirname, '..', '..', category.img);
        const fileExists = await fsPromises
          .access(filePath)
          .then(() => true)
          .catch(() => false);

        if (fileExists) {
          await fsPromises.unlink(filePath);
          console.log(`Старый файл ${filePath} успешно удален`);
        }
      }

      // Обновляем путь к изображению категории в базе данных
      await Category.update({ img: newImgPath }, { where: { id } });

      const updatedCategory = await Category.findAll({
        order: [['categoryName', 'ASC']],
        raw: true,
      });

      res.json({
        category: updatedCategory,
        message: 'Файл загружен успешно.',
      });
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      res.status(500).json({ error: 'Ошибка загрузки файла' });
    }
  }
);

module.exports = router;
