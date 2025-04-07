const router = require('express').Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { Manager } = require('../../db/models');

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = router
  .get('/check', async (req, res) => {
    try {
      if (!req.session || !req.session.idManager) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
      } else {
        const manager = await Manager.findOne({
          where: { id: req.session.idManager },
        });
        res.json({
          message: 'Проверка авторизации прошла успешно!',
          id: manager.id,
          isAdmin: manager.isAdmin,
          lastName: manager.lastName,
          firstName: manager.firstName,
          middleName: manager.middleName,
          phone: manager.phone,
          email: manager.email,
        });
      }
    } catch (error) {
      console.log(error);
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
          req.session.idManager = manager.id;
          req.session.save(() => {
            res.json({
              message: 'Вы успешно авторизованы!',
              id: manager.id,
              isAdmin: manager.isAdmin,
              lastName: manager.lastName,
              firstName: manager.firstName,
              middleName: manager.middleName,
              phone: manager.phone,
              email: manager.email,
            });
          });
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
  })

  .post('/resetPassword', async (req, res) => {
    const { email } = req.body;

    function generateCode() {
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset[randomIndex];
      }
      return code;
    }

    try {
      const manager = await Manager.findOne({
        where: { email },
      });

      if (!manager) {
        res.status(404).json({ error: 'Пользователь не найден' });
      } else {
        //* генерация пароля
        const code = generateCode();
        console.log('code', code);

        const mailData = {
          from: process.env.EMAIL,
          to: manager.email,
          subject: 'Временный пароль DolgovGroup',
          text: ' ',
          html: `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #333; text-align: center;">Уважаемый(ая), ${manager.firstName} ${manager.middleName}!</h2>
              <p style="font-size: 18px; color: #333; text-align: center;">Ваш временный пароль для входа в личный кабинет:</p>
              <div style="text-align: center; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
                <span style="font-size: 2em; font-weight: bold; display: block;">${code}</span>
              </div>
              <p style="font-size: 14px; color: #555; text-align: center;">Используйте код в течение 24 часов</p>
              <p style="font-size: 16px; color: #555; text-align: center;">Желаем вам хорошего дня!</p>
            </div>
          `,
        };

        transporter.sendMail(mailData, (error) => {
          if (error) {
            console.error('Ошибка при отправке электронного письма:', error);

            return res
              .status(500)
              .json({ message: 'Ошибка при отправке электронного письма' });
          }
          res.status(200).json({ message: 'Код пользователю отправлен' });
        });
        console.log('Код для сотрудника отправлен по почте');

        // ? хеширует пароль
        const hash = await bcrypt.hash(code, 10);

        if (!manager) {
          res.status(404).json({ error: 'Пользователь не найден' });
        } else {
          await Manager.update(
            { password: hash },
            { where: { email: manager.email } }
          );
          console.log('Код пользователю отправлен');
        }
        res.json({ message: 'Пароль отправлен на почту' });
      }
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  });
