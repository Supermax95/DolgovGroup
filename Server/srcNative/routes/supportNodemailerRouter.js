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
    const formattedPhoneNumber = `+7(${dataUser.phoneNumber.substring(
      0,
      3
    )})${dataUser.phoneNumber.substring(3, 6)}-${dataUser.phoneNumber.substring(
      6,
      8
    )}-${dataUser.phoneNumber.substring(8, 10)}`;

    const mailData = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Обращение в службу поддержки от ${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName}`,
      text: '',
      html: `
      <p>В приложении было получено обращение от пользователя с именем ${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName}.</p>
      <ul> 
      <li>Электронная почта пользователя: ${dataUser.email}</li>
      <li>Телефон пользователя: ${formattedPhoneNumber}</li>
      <li>Тема обращения: <strong>${titleMessage}</strong></li>
      <li>
        Содержание обращения: <br>
        ${message}
      </li>
    </ul>
    `,
    };

    const userMailData = {
      from: process.env.EMAIL,
      to: dataUser.email,
      subject: `Статус вашего заявления по теме: ${titleMessage}`,
      text: '',
      html: `
     

  <p>Уважаемый(ая) ${dataUser.firstName} ${dataUser.middleName}, Ваше обращение принято. В ближайшее время мы его рассмотрим.</p>
  
  <p style="font-weight: bold; color: #555;">С уважением,</p>
  <p style="font-weight: bold; color: #555;">ООО "ДОЛГОВ ГРУПП"</p>

  <div class="logo">
      <img src="adaptive-icon2.png" alt="Логотип">
  </div>
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
    const formattedPhoneNumber = `+7(${dataUser.phoneNumber.substring(
      0,
      3
    )})${dataUser.phoneNumber.substring(3, 6)}-${dataUser.phoneNumber.substring(
      6,
      8
    )}-${dataUser.phoneNumber.substring(8, 10)}`;

    const mailData = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Проверка является ли пользователь сотрудником`,
      text: '',
      html: `
        <b> Посетитель сайта ${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName} перемещен в статус нового сотрудника. </b>
        <br>Почта пользователя: <b>${dataUser.email}</b>
        <br>Телефон пользователя: <b>${formattedPhoneNumber}</b>
        <br>Текст обращения: <i>Проверьте является ли ${dataUser.firstName} ${dataUser.middleName} сотрудником компании.Если является предоставьте доступ</i>
      `,
    };

    const userMailData = {
      from: process.env.EMAIL,
      to: dataUser.email,
      subject: `Статус вашего заявления`,
      text: '',
      html: `
        <b>Уважаемый(ая), ${dataUser.firstName} ${dataUser.middleName},</b>
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
