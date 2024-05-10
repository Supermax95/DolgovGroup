const { PORT, IP } = process.env;
const router = require('express').Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { DiscountCard } = require('../../db/models');
const authMiddleware = require('../middlewares/auth-middleware');

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post('/supportNodemailerRouter', authMiddleware, async (req, res) => {
  try {
    const { titleMessage, message } = req.body;
    const token = req.headers.authorization.split(' ')[1];
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

    if (titleMessage === 'Накопленные баллы отсутствуют') {
      const userMailData = {
        from: process.env.EMAIL,
        to: dataUser.email,
        subject: `Статус вашего заявления по теме: ${titleMessage}`,
        text: '',
        html: `
          <p>Уважаемый(ая) ${dataUser.firstName} ${dataUser.middleName}, Ваше обращение принято. Время рассмотрения составит от 30 до 45 дней.</p>
          <p style="font-weight: bold; color: #555;">С уважением,</p>
          <p style="font-weight: bold; color: #555;">"Наш Продукт"</p>
        `,
      };

      transporter.sendMail(userMailData);
      transporter.sendMail(mailData);

      res.status(200).json({ message: 'Письмо отправлено' });
    } else {
      const userMailData = {
        from: process.env.EMAIL,
        to: dataUser.email,
        subject: `Статус вашего заявления по теме: ${titleMessage}`,
        text: '',
        html: `
          <p>Уважаемый(ая) ${dataUser.firstName} ${dataUser.middleName}, Ваше обращение принято. В ближайшее время мы его рассмотрим.</p>
          <p style="font-weight: bold; color: #555;">С уважением,</p>
          <p style="font-weight: bold; color: #555;">"Наш Продукт"</p>
        `,
      };

      transporter.sendMail(userMailData);
      transporter.sendMail(mailData);

      res.status(200).json({ message: 'Письмо отправлено' });
    }
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).json({
      message: 'Произошла ошибка при отправке письма',
    });
  }
});

router.post('/checkEmployee', authMiddleware, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const dataUser = await DiscountCard.findOne({ where: { id: user.id } });
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
      subject: `Проверка нового сотрудника - ${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName} `,
      text: '',
      html: `
        <p> Пользователь запросил доступ сотрудника.</p>
        <ul> 
        <li>ФИО: <strong>${dataUser.lastName} ${dataUser.firstName} ${dataUser.middleName}</strong></li>
        <li>Почта пользователя: <strong>${dataUser.email}</strong></li>
        <li>Телефон пользователя: <strong>${formattedPhoneNumber}</strong></li>
        </ul> 
        <p>Необходимо проверить, включен ли пользователь в список сотрудников компании, и если да, предоставить ему соответствующие права доступа.</p>
        `,
    };

    const userMailData = {
      from: process.env.EMAIL,
      to: dataUser.email,
      subject: 'Заявление на смену статуса в приложении принято',
      text: '',
      html: `
        <p>Уважаемый(ая) ${dataUser.firstName} ${dataUser.middleName},</p>
        <p>Ваш запрос о предоставлении прав доступа сотрудника находится в процессе рассмотрения. 
        Ожидайте уведомления о результате рассмотрения.</p>

        <p style="font-weight: bold; color: #555;">С уважением,</p>
        <p style="font-weight: bold; color: #555;">"Наш Продукт"</p>
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
