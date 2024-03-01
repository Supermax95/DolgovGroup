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
  secure: true,
});

module.exports = router
  .get('/data', async (req, res) => {
    try {
      const manager = await Manager.findAll({
        where: {
          isAdmin: false,
        },
        attributes: {
          exclude: ['password'],
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
      const managerEmail = await Manager.findOne({
        where: { email: newManager.email },
      });

      const managerPhone = await Manager.findOne({
        where: { phone: newManager.phone },
      });

      if (managerEmail) {
        res.status(400).json({
          error: 'Пользователь с такой электронной почтой уже существует',
        });
      } else if (managerPhone) {
        res.status(400).json({
          error: 'Пользователь с таким номером телефона уже существует',
        });
      } else {
        await Manager.create({
          lastName: newManager.lastName,
          firstName: newManager.firstName,
          middleName: newManager.middleName,
          phone: newManager.phone,
          email: newManager.email,
        });

        const managers = await Manager.findAll({
          where: {
            isAdmin: false,
          },
          attributes: {
            exclude: ['password'],
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

        const searchManager = await Manager.findOne({
          where: { email: newManager.email },
        });

        if (!searchManager) {
          res.status(404).json({ error: 'Пользователь не найден' });
        } else {
          await Manager.update(
            { password: hash },
            { where: { email: newManager.email } }
          );
          console.log('Код пользователю отправлен');
        }

        res.json({ managers });
      }
    } catch (error) {
      console.log('Ошибка при получении данных из базы данных', error);
      return res.status(500).json({ error: 'Произошла ошибка' });
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
        //* Обновление ФИО
        const fieldsToUpdateFIO = {
          lastName: updateManager.lastName,
          firstName: updateManager.firstName,
          middleName: updateManager.middleName,
        };

        await Manager.update(fieldsToUpdateFIO, {
          where: { id: managerId },
        });

        //* обновление телефона
        if (updateManager.phone !== manager.phone) {
          const managerWithPhone = await Manager.findOne({
            where: { phone: updateManager.phone },
          });

          if (!managerWithPhone) {
            await Manager.update(
              { phone: updateManager.phone },
              { where: { id: managerId } }
            );
          } else {
            res.status(409).json({
              error: 'Пользователь с таким номером телефона уже существует',
            });
            return;
          }
        }

        //* Обновление почты, если она изменилась
        if (updateManager.email !== manager.email) {
          const managerWithEmail = await Manager.findOne({
            where: { email: updateManager.email },
          });

          if (!managerWithEmail) {
            await Manager.update(
              { email: updateManager.email },
              {
                where: { id: managerId },
              }
            );
          } else {
            res
              .status(409)
              .json({ error: 'Пользователь с такой почтой уже существует' });
            return;
          }
        }

        console.log('Данные успешно обновлены');

        //* Получение обновленного списка маркетологов
        const managers = await Manager.findAll({
          where: {
            isAdmin: false,
          },
          attributes: {
            exclude: ['password'],
          },
          order: [
            ['lastName', 'ASC'],
            ['firstName', 'ASC'],
            ['middleName', 'ASC'],
          ],
          raw: true,
        });

        res.json({ managers });
      }
    } catch (error) {
      console.log('Ошибка при получении данных из базы данных', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  })

  .post('/oneTimePassword', async (req, res) => {
    const { managerId } = req.body;

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

      if (!manager) {
        res.status(404).json({ error: 'Пользователь не найден' });
      } else {
        //! если письмо не отослалось, произошла какая-то ошибка, надо сообщать об этом на фронт
        //* генерация пароля
        const code = generateCode();

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

        const searchManager = await Manager.findOne({
          where: { email: manager.email },
        });

        if (!searchManager) {
          res.status(404).json({ error: 'Пользователь не найден' });
        } else {
          await Manager.update(
            { password: hash },
            { where: { email: manager.email } }
          );
          console.log('Код пользователю отправлен');
        }

        // const resultPass = {
        //   email: searchManager.email,
        //   firstName: searchManager.firstName,
        //   lastName: searchManager.lastName,
        // };

        const resultPass = searchManager.get();

        res.json({
          message: `Временный пароль выслан на почту ${manager.email}`,
          resultPass,
        });
      }
    } catch (error) {
      console.log('Ошибка при получении данных из базы данных', error);
    }
  })

  .delete('/deleteManager', async (req, res) => {
    const { managerId } = req.body;

    try {
      await Manager.destroy({
        where: { id: managerId },
      });
      const managers = await Manager.findAll({
        where: {
          isAdmin: false,
        },
        attributes: {
          exclude: ['password'],
        },
        order: [
          ['lastName', 'ASC'],
          ['firstName', 'ASC'],
          ['middleName', 'ASC'],
        ],
        raw: true,
      });
      res.json(managers);
    } catch (error) {
      console.error('Ошибка при удалении данных', error);
      res.status(500).json({ error: 'Произошла ошибка на сервере' });
    }
  });
