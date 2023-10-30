const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Manager } = require('../../db/models');

module.exports = router
  // .get('/auth', async (req, res) => {
  //   const { passport } = req.session;
  //   if (passport) {
  //     res.json({ email: passport.user.email });
  //   } else {
  //     res.json({
  //       email: req.session?.email,
  //       //isAdmin: req.session?.isAdmin,
  //     });
  //   }
  // })
  .get('/check', async (req, res) => {
    try {
      const manager = await Manager.findOne({
        where: { email: req.session?.email },
      });

      if (!manager) {
        res.json({ message: 'Хуй' });
      } else {
        res.json(manager);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const manager = await Manager.findOne({ where: { email } });

      if (!manager) {
        res.status(401).json({ message: 'Пользователь не найден' });
      } else {
        const isPasswordValid = await bcrypt.compare(
          password,
          manager.password
        );

        if (!isPasswordValid) {
          res.status(401).json({ message: 'Неверный пароль' });
        } else {
          req.session.email = manager.email;
          req.session.save(() => {
            res.json({ message: 'Вы успешно авторизованы!', manager });
          });
          // console.log('asdfghjkl', req.session);
        }
      }
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  })

  .post('/logout', async (req, res) => {
    try {
      req.session.destroy((error) => {
        if (error) {
          console.log(error);
        } else {
          res.clearCookie('name');
          res.status(200).json({ message: 'Пользователь вышёл из профиля' });
        }
      });
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  });
