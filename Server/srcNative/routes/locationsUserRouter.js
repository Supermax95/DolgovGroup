// const router = require('express').Router();
// const { Location } = require('../../db/models');
// const { Op } = require('sequelize');
// const authMiddleware = require('../middlewares/auth-middleware');

// router.get('/userlocations', authMiddleware,  async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ error: 'Пользователь не авторизован' });
//     }
//     const locations = await Location.findAll({
//       where: {
//         invisible: { [Op.not]: [true] },
//       },
//       order: [
//         ['city', 'ASC'],
//         ['address', 'ASC'],
//       ],
//       raw: true,
//     });

//     res.json(locations);
//   } catch (error) {
//     console.error('Ошибка при получении данных из базы данных', error);
//     if (error.name === 'JsonWebTokenError') {
//       res.status(401).json({ error: 'Невалидный токен' });
//     } else {
//       res.status(500).json({ error: 'Произошла ошибка на сервере' });
//     }
//   }
// });

// module.exports = router;

const router = require('express').Router();
const { Op } = require('sequelize');
const { Location } = require('../../db/models');
// const authMiddleware = require('../middlewares/auth-middleware');

// router.get('/userlocations', authMiddleware, async (req, res) => {
router.get('/userlocations', async (req, res) => {
  try {
    const locations = await Location.findAll({
      where: {
        invisible: { [Op.not]: true },
      },
      order: [
        ['city', 'ASC'],
        ['address', 'ASC'],
      ],
      raw: true,
    });

    res.json(locations);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
