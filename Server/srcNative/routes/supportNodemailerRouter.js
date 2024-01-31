const router = require('express').Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { DiscountCard } = require('../../db/models');

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

router.post('/supportNodemailerRouter', async (req, res) => {
  try {
    const { titleMessage, message } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const dataUser = await DiscountCard.findOne({ where: { id: user.id } });

    const mailData = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Обращение в службу поддержки`,
      text: '',
      html: `
      <style>
        body {
          font-size: 18px; /* Размер шрифта для основного текста */
        }
        b {
          font-size: 20px; /* Размер шрифта для жирного текста */
        }
        i {
          font-size: 16px; /* Размер шрифта для курсива */
        }
        p {
          font-size: 18px; /* Размер шрифта для абзаца */
        }
      </style>
      <b> Посетитель сайта ${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName} оставил обращение. </b>
      <br>Почта пользователя: <b>${dataUser.email}</b>
      <br>Тема обращения: <b>${titleMessage}</b>
      <br>Текст обращения: <i>${message}</i>
    `,
    };

    transporter.sendMail(mailData);

    res.status(200).json({ message: 'Письмо отправлено' });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).json({
      message: 'Произошла ошибка при отправке письма',
    });
  }
});

module.exports = router;
