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
    console.log(req.headers);
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
      <p> Пользователь приложения <b>${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName} </b> оставил обращение. </p>
      <br>Почта пользователя: <b>${dataUser.email}</b>
      <br>Тема обращения: <b>${titleMessage}</b>
      <br>Текст обращения: <i>${message}</i>
    `,
    };

    const userMailData = {
      from: process.env.EMAIL,
      to: dataUser.email,
      subject: `Статус вашего заявления`,
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
        <b>Уважаемый ${dataUser.firstName} ${dataUser.middleName},</b>
        <br>
        <p>Ваш обращение по теме: "<b>${titleMessage}</b>" принято. В ближайшем времени, мы его рассмотрим.</p>
      `,
    };

    transporter.sendMail(userMailData);
    transporter.sendMail(mailData);

    res.status(200).json({ message: 'Письмо отправлено' });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).json({
      message: 'Произошла ошибка при отправке письма',
    });
  }
});

router.post('/checkEmployee', async (req, res) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const dataUser = await DiscountCard.findOne({ where: { id: user.id } });
    console.log(dataUser);
    await DiscountCard.update(
      { userStatus: 'Новый сотрудник' },
      { where: { id: user.id } }
    );
    const updatedUser = await DiscountCard.findOne({ where: { id: user.id } });

    const mailData = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Проверка является ли пользователь сотрудником`,
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
        <b> Посетитель сайта ${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName} перемещен в статус нового сотрудника. </b>
        <br>Почта пользователя: <b>${dataUser.email}</b>
        <br>Текст обращения: <i>Проверьте является ли ${dataUser.firstName} ${dataUser.middleName} сотрудником компании.Если является предоставьте доступ</i>
      `,
    };

    const userMailData = {
      from: process.env.EMAIL,
      to: dataUser.email,
      subject: `Статус вашего заявления`,
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
        <b>Уважаемый ${dataUser.firstName} ${dataUser.middleName},</b>
        <br>
        <p>Ваш запрос рассматривается. В скором времени мы примем решение по вашему статусу.</p>
      `,
    };

    transporter.sendMail(mailData);
    transporter.sendMail(userMailData);

    res.status(200).json({ message: 'Письмо отправлено', updatedUser });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).json({
      message: 'Произошла ошибка при отправке письма',
    });
  }
});

module.exports = router;
