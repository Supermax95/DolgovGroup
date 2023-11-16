const router = require('express').Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { Manager } = require('../../db/models');

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

module.exports = router
  .get('/data', async (req, res) => {
    try {
      const manager = await Manager.findAll({
        where: {
          isAdmin: false,
        },
        order: [
          ['lastName', 'ASC'],
          ['firstName', 'ASC'],
          ['middleName', 'ASC'],
        ],
        raw: true,
      });
      res.json(manager);
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      res.status(500).json({ error: 'Произошла ошибка на сервере' });
    }
  })

  .post('/newManager', async (req, res) => {
    const { newManager } = req.body;

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
        where: { email: newManager.email },
      });

      if (manager) {
        res.status(409).json({
          message: 'Пользователь с такой электронной почтой уже существует',
        });
      } else {
        await Manager.create({
          lastName: newManager.lastName,
          firstName: newManager.firstName,
          middleName: newManager.middleName,
          email: newManager.email,
        });

        const managers = await Manager.findAll({
          where: {
            isAdmin: false,
          },
          order: [
            ['lastName', 'ASC'],
            ['firstName', 'ASC'],
            ['middleName', 'ASC'],
          ],
          raw: true,
        });

        //! если письмо не отослалось, произошла какая-то ошибка, надо сообщать об этом на фронт
        //* генерация пароля
        const code = generateCode();
        console.log('code', code);
        const mailData = {
          from: process.env.EMAIL,
          to: newManager.email,
          subject: 'Временный пароль DolgovGroup',
          text: ' ',
          html: `
          <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Уважаемый(ая), ${newManager.firstName} ${newManager.middleName}!</h2>
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

        // ? хеширует пароль и повторно ищет юзера с почтой
        const hash = await bcrypt.hash(code, 10);

        const searchmanager = await Manager.findOne({
          where: { email: newManager.email },
        });

        if (!searchmanager) {
          res.status(404).json({ error: 'Пользователь не найден' });
        } else {
          await Manager.update(
            { password: hash },
            { where: { email: newManager.email } }
          );
          console.log('Код пользователю отправлен');
        }

        res.json(managers);
      }
    } catch (error) {
      console.log('Ошибка при получении данных из базы данных', error);
    }
  })

  .put('/updateManager', async (req, res) => {
    const { managerId, updateManager } = req.body;

    try {
      const manager = await Manager.findOne({
        where: { id: managerId },
      });

      if (!manager) {
        res.status(404).json({ error: 'Пользователь не найден' });
      } else {
        const updateMan = await Manager.update(updateManager, {
          where: { id: managerId },
        });
        console.log('updateManupdateMan', updateMan);

        const managers = await Manager.findAll({
          where: {
            isAdmin: false,
          },
          order: [
            ['lastName', 'ASC'],
            ['firstName', 'ASC'],
            ['middleName', 'ASC'],
          ],
          raw: true,
        });
        res.json(managers);
      }
    } catch (error) {
      console.log('Ошибка при получении данных из базы данных', error);
    }
  })

  .post('/oneTimePassword', async (req, res) => {
    const { managerId } = req.body;
    console.log(managerId);

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
        where: { id: managerId },
      });

      console.log('manageremail==========================>', manager.email);

      if (!manager) {
        res.status(404).json({ error: 'Пользователь не найден' });
      } else {
        //! если письмо не отослалось, произошла какая-то ошибка, надо сообщать об этом на фронт
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

        // ? хеширует пароль и повторно ищет юзера с почтой
        const hash = await bcrypt.hash(code, 10);

        const searchmanager = await Manager.findOne({
          where: { email: manager.email },
        });

        if (!searchmanager) {
          res.status(404).json({ error: 'Пользователь не найден' });
        } else {
          await Manager.update(
            { password: hash },
            { where: { email: manager.email } }
          );
          console.log('Код пользователю отправлен');
        }

        res.json({
          message: `Временный пароль выслан на почту ${manager.email}`,
        });
      }
    } catch (error) {
      console.log('Ошибка при получении данных из базы данных', error);
    }
  });
