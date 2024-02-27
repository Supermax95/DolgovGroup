// const express = require('express');

// const { PORT, IP } = process.env;
// const { DiscountCard } = require('../../db/models');

// const router = express.Router();
// const nodemailer = require('nodemailer');
// const uuid = require('uuid');

const router = require('express').Router();
const { PORT, IP } = process.env;
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const { DiscountCard } = require('../../db/models');

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

router.post('/nodemailerCodeSend/:id', async (req, res) => {
  const userId = req.params.id;
  const { firstName, middleName, email, userStatus } = req.body;

  function generateCode() {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
  }

  const code = generateCode();

  //   await DiscountCard.update(code, {
  //     where: { id: userId },
  //   });

  const mailData = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Статус пользователя',
    text: ' ',
    html: `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333; text-align: center;">Уважаемый(ая), ${firstName} ${middleName}!</h2>
      <p style="font-size: 16px; color: #555; text-align: center;">Ваш статус изменился: <strong>${userStatus}</strong></p>
      <p style="font-size: 18px; color: #333; text-align: center;">Для дальнейшего использования приложения введите этот код:</p>
      <div style="text-align: center; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
        <span style="font-size: 2em; font-weight: bold; display: block;">${code}</span>
      </div>
      <p style="font-size: 16px; color: #555; text-align: center;">Желаем вам хорошего дня!</p>
    </div>
    
  `,
  };

  transporter.sendMail(mailData, (error) => {
    if (error) {
      return res
        .status(500)
        .json({ message: 'Ошибка при отправке электронного письма' });
    }
    res.status(200).json({ message: 'Код пользователю отправлен' });
  });
  console.log('Код для сотрудника отправлен по почте');
});

router.post('/nodemailerActivation/:id', async (req, res) => {
  const userId = req.params.id;
  const { firstName, middleName } = req.body;
  try {
    const user = await DiscountCard.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const activationLink = uuid.v4();

    await user.update({ activationLink });

    const mailData = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Подтверждение почты',
      text: '',
      html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Уважаемый(ая), ${firstName} ${middleName}!</h2>
      <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 20px;">
        Для активации вашего аккаунта, пожалуйста, перейдите по следующей ссылке:
      </p>
      <div style="text-align: center; margin-bottom: 20px;">
        <a href="http://${IP}:${PORT}/api/activate/${activationLink}" style="display: inline-block; padding: 15px 30px; background-color: #4caf50; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Активировать аккаунт
        </a>
      </div>`,
    };
    transporter.sendMail(mailData);

    res
      .status(200)
      .json({ message: 'Письмо с новым activationLink отправлено' });
  } catch (error) {
    console.error('Ошибка при генерации и обновлении activationLink:', error);
    res.status(500).json({
      message: 'Произошла ошибка при генерации и обновлении activationLink',
    });
  }
});

module.exports = router;
