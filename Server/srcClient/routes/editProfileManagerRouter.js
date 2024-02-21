const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Manager } = require('../../db/models');

module.exports = router
  .get('/info', async (req, res) => {
    try {
      const manager = await Manager.findAll({
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

  .put('/fullName/', async (req, res) => {
    const { managerId, newLastName, newFirstName, newMiddleName } = req.body;
    try {
      const manager = await Manager.findOne({ where: { id: managerId } });

      if (!manager) {
        return res.status(401).json({ error: 'Пользователь не найден' });
      }

      await manager.update({
        lastName: newLastName,
      });
      await manager.update({
        firstName: newFirstName,
      });
      await manager.update({
        middleName: newMiddleName,
      });

      return res.status(200).json({
        lastName: newLastName,
        firstName: newFirstName,
        middleName: newMiddleName,
        message: 'Фамилия, имя и отчество успешно изменены',
      });
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      return res.status(500).json({ error: 'Произошла ошибка' });
    }
  })

  //* даже если email осталось прежним у текущего id,
  //* появится уведомление, что изменения внесены
  .put('/email/', async (req, res) => {
    const { managerId, newEmail } = req.body;

    try {
      const manager = await Manager.findOne({ where: { id: managerId } });

      if (!manager) {
        res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (newEmail !== manager.email) {
        const managerWithEmail = await Manager.findOne({
          where: { email: newEmail },
        });

        if (!managerWithEmail) {
          await Manager.update(
            { email: newEmail },
            { where: { id: managerId } }
          );
          res.status(200).json({
            email: newEmail,
            message: 'Email успешно изменен',
          });
        } else {
          res.status(409).json({
            error: 'Пользователь с такой электронной почтой уже существует',
          });
        }
      } else {
        res.status(200).json({
          email: newEmail,
          message: 'Email успешно изменен',
        });
      }
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      return res.status(500).json({ error: 'Произошла ошибка' });
    }
  })

  //* даже если phone осталось прежним у текущего id,
  //* появится уведомление, что изменения внесены
  .put('/phone/', async (req, res) => {
    const { managerId, newPhone } = req.body;

    try {
      const manager = await Manager.findOne({ where: { id: managerId } });

      if (!manager) {
        res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (newPhone !== manager.phone) {
        const searchPhone = await Manager.findOne({
          where: { phone: newPhone },
        });

        if (!searchPhone) {
          await Manager.update(
            { phone: newPhone },
            { where: { id: managerId } }
          );
          res.status(200).json({
            phone: newPhone,
            message: 'Номер телефона успешно изменен',
          });
        } else {
          res.status(409).json({
            error: 'Пользователь с таким номером телефона уже существует',
          });
        }
      } else {
        res.status(200).json({
          phone: newPhone,
          message: 'Номер телефона успешно изменен',
        });
      }
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      return res.status(500).json({ error: 'Произошла ошибка' });
    }
  })

  .put('/password/', async (req, res) => {
    const { managerId, oldPassword, newPassword } = req.body;

    try {
      const manager = await Manager.findOne({ where: { id: managerId } });

      if (!manager) {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        manager.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Текущий пароль введён неверно' });
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await manager.update({ password: hash });

      res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
      console.error('Ошибка при получении данных из базы данных', error);
      return res.status(500).json({ error: 'Произошла ошибка' });
    }
  });
