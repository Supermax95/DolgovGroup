const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
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
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">Активировать аккаунт</a>
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