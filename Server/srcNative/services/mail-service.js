const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: 'Подтверждение почты',
        text: '',
        html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
        <h2 style="color: #333;">Для активации аккаунта перейдите по ссылке</h2>
        <p style="font-size: 16px; color: #555;">
          <a href="${link}" style="text-decoration: none; color: #fff; background-color: #4caf50; padding: 10px 20px; border-radius: 5px; display: inline-block;">
            Активировать аккаунт
          </a>
        </p>
        <p>Если это письмо пришло вам по ошибке, просто проигнорируйте его.</p>
      </div>
      `,
      });
      console.log('Письмо успешно отправлено');
    } catch (error) {
      console.error('Ошибка отправки письма: ', error);
    }
  }

  async sendNewPasswordMail(to, newPassword) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: 'Изменение пароля',
        text: '',
        html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <p style="font-size: 18px; color: #333; text-align: center;">Ваш временный пароль:</p>
        <div style="text-align: center; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
          <span style="font-size: 2em; font-weight: bold; display: block;">${newPassword}</span>
        </div>
      </div>
      `,
      });
      console.log('Письмо успешно отправлено');
    } catch (error) {
      console.error('Ошибка отправки письма: ', error);
    }
  }
}

module.exports = new MailService();
