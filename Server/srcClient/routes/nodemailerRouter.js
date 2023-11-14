const express = require('express');
const { DiscountCard } = require('../../db/models');

const nodemailerRouterClient = express.Router();
const nodemailer = require('nodemailer');
const uuid = require('uuid');

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

nodemailerRouterClient.post('/nodemailerCodeSend/:id', async (req, res) => {
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

nodemailerRouterClient.post('/nodemailerActivation/:id', async (req, res) => {
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
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Уважаемый(ая), ${firstName} ${middleName}!</h2>
          <h2 style="color: #333; text-align: center;">Для активации перейдите по ссылке</h2>
          <a href="${activationLink}">Активировать аккаунт</a>
        </div>
      `,
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

module.exports = nodemailerRouterClient;
