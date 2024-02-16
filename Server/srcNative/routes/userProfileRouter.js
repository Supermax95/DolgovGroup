const { PORT, IP } = process.env;
const uuid = require('uuid');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { DiscountCard } = require('../../db/models');

module.exports = router
  .get('/edit', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const dataUser = await DiscountCard.findOne({ where: { id: user.id } });
      console.log(dataUser);
      res.json(dataUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/fullname', async (req, res) => {
    try {
      const { newLastName, newFirstName, newMiddleName } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      await userData.update({
        lastName: newLastName,
      });

      await userData.update({
        firstName: newFirstName,
      });

      await userData.update({
        middleName: newMiddleName,
      });

      res.status(200).json({
        lastName: newLastName,
        firstName: newFirstName,
        middleName: newMiddleName,
        message: 'Фамилия, имя и отчество успешно изменены',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/calendar', async (req, res) => {
    try {
      const { newBirthDate } = req.body;
      const token = req.headers.authorization.split(' ')[1];

      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      await userData.update({
        birthDate: newBirthDate,
      });
      res.status(200).json({
        message: 'День рождения успешно изменено',
        birthDate: newBirthDate,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  });

const sendConfirmationEmail = async (newEmail, confirmationCode) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    secure: true,
  });

  const activeLinkForNewEmail = `http://${IP}:${PORT}/confirm-email/${confirmationCode}/${newEmail}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: newEmail,
    subject: 'Подтверждение адреса электронной почты',
    html: `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
    <h2 style="color: #333;">Для подтверждения адреса вашей электронной почты, пожалуйста, перейдите по ссылке:</h2>
    <p style="font-size: 16px; color: #555;">
      <a href="${activeLinkForNewEmail}" style="text-decoration: none; color: #fff; background-color: #4caf50; padding: 10px 20px; border-radius: 5px; display: inline-block;">
      Подтвердить email
      </a>
    </p>
    <p>Если это письмо пришло вам по ошибке, просто проигнорируйте его.</p>

  </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

router
  .put('/email', async (req, res) => {
    try {
      const { newEmail } = req.body;

      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const searchEmail = await DiscountCard.findOne({
        where: { email: newEmail },
      });

      if (searchEmail) {
        return res.status(409).json({
          message: 'Пользователь с такой электронной почтой уже существует',
        });
      }

      const confirmationCode = uuid.v4();

      await userData.update({
        emailConfirmationCode: confirmationCode,
        newEmail,
      });

      sendConfirmationEmail(newEmail, confirmationCode);

      res.status(200).json({
        newEmail: userData.newEmail,
        message: 'Письмо с кодом подтверждения отправлено на новый email',
        email: userData.email,
      });
    } catch (error) {
      console.error(error);
    }
  })

  .get('/confirm-email/:confirmationCode/:newEmail', async (req, res) => {
    try {
      const { confirmationCode, newEmail } = req.params;
      const userData = await DiscountCard.findOne({
        where: { emailConfirmationCode: confirmationCode },
      });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      await userData.update({
        email: newEmail,
        emailConfirmationCode: '',
        newEmail: '',
      });

      const credentials = 'Exchange:Exchange';
      const base64Credentials = Buffer.from(credentials).toString('base64');
      await axios.post(
        `http://retail.dolgovagro.ru/rtnagaev/hs/loyaltyservice/updateclientcard?ClientCardID=${userData.barcode}&Email=${userData.email}
      `,
        {},
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );
      return res.redirect(`http://${IP}:${FRONTPORT}/email/success`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
  })

  .put('/newpassword', async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      console.log('req.headers', req.headers);

      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        userData.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Старый пароль неверен' });
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await userData.update({ password: hash });

      res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
      console.error('Произошла ошибка при изменении пароля:', error);
      res.status(500).json({ error: 'Произошла ошибка' });
    }
  })

  .put('/changePhoneNumber', async (req, res) => {
    try {
      const { newPhoneNumber } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      const userData = await DiscountCard.findOne({ where: { id: user.id } });

      if (!userData) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const cleanedPhoneNumber = newPhoneNumber.replace(/\D/g, '');

      const trimmedPhoneNumber = cleanedPhoneNumber.substring(1);

      const userByPhoneNumber = await DiscountCard.findOne({
        where: { phoneNumber: trimmedPhoneNumber },
      });
      if (userByPhoneNumber) {
        return res
          .status(404)
          .json({ error: `${newPhoneNumber} уже существует` });
      }

      await userData.update({ phoneNumber: trimmedPhoneNumber });
      const credentials = 'Exchange:Exchange';
      const base64Credentials = Buffer.from(credentials).toString('base64');
      await axios.post(
        `http://retail.dolgovagro.ru/rtnagaev/hs/loyaltyservice/updateclientcard?ClientCardID=${
          userData.barcode
        }&Phone=${'+7' + trimmedPhoneNumber}
      `,
        {},
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      res.status(200).json({
        phoneNumber: trimmedPhoneNumber,
        message: 'Номер телефона успешно изменен',
      });
    } catch (error) {
      console.error('Произошла ошибка при изменении номера телефона:', error);
      res.status(500).json({ error: 'Произошла ошибка' });
    }
  })

  .put('/notification', async (req, res) => {
    try {
      const { notificationEmail, notificationPush } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Отсутствует токен авторизации' });
      }
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      if (!user || !user.id) {
        return res.status(401).json({ error: 'Неверный токен авторизации' });
      }
      const userToUpdate = await DiscountCard.findByPk(user.id);
      if (!userToUpdate) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      await userToUpdate.update({
        notificationEmail,
        notificationPush,
      });

      return res.status(200).json({
        notificationEmail,
        notificationPush,
        message: 'Настройки уведомлений успешно обновлены',
      });
    } catch (error) {
      console.error('Ошибка при обновлении настроек уведомлений:', error);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });
