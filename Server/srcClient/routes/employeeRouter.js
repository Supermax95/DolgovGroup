const router = require('express').Router();
const { Op } = require('sequelize');
const { DiscountCard } = require('../../db/models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

router.get('/admin/employees', async (req, res) => {
  try {
    const employees = await DiscountCard.findAll({
      where: {
        userStatus: {
          [Op.not]: 'Клиент',
        },
      },
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
      ],
      raw: true,
    });
    res.json(employees);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

router.put('/admin/employees/:id', async (req, res) => {
  const employeeId = req.params.id;
  const { newInfo } = req.body;

  try {
    const existingEmployee = await DiscountCard.findOne({
      where: {
        email: newInfo.email,
        id: { [Op.not]: employeeId },
      },
    });

    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: 'Пользователь с таким email уже существует' });
    }

    const employee = await DiscountCard.findOne({
      where: { id: employeeId },
      raw: true,
    });

    if (newInfo.userStatus !== employee.userStatus) {
      const { email, firstName, middleName, userStatus } = newInfo;
      const isEmployee = newInfo.userStatus === 'Сотрудник';

      const additionalText = isEmployee
        ? '<p style="font-size: 16px; color: #555; text-align: center;">В приложении перейдите во вкладку "Служба поддержки", чтобы статус стал активным.</p>'
        : '';

      const mailData = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Статус пользователя',
        text: ' ',
        html: `
          <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Уважаемый(ая), ${firstName} ${middleName}!</h2>
            <p style="font-size: 16px; color: #555; text-align: center;">Ваш статус в приложении: <strong>${userStatus}</strong></p>
            </div>
            ${additionalText}
            <p style="font-size: 16px; color: #555; text-align: center;">Желаем вам хорошего дня!</p>
          </div>
        `,
      };

      await transporter.sendMail(mailData);
    }
    if (newInfo.phoneNumber !== employee.phoneNumber) {
      const cleanedPhoneNumber = newInfo.phoneNumber.replace(/\D/g, '');
      const trimmedPhoneNumber = cleanedPhoneNumber.substring(1);

      const existingEmployeeByPhone = await DiscountCard.findOne({
        where: {
          phoneNumber: trimmedPhoneNumber,
          id: { [Op.not]: employeeId },
        },
      });

      if (existingEmployeeByPhone) {
        return res.status(400).json({
          error: 'Пользователь с таким номером телефона уже существует',
        });
      }

      await DiscountCard.update(
        { ...newInfo, phoneNumber: trimmedPhoneNumber },
        { where: { id: employeeId } }
      );
    } else {
      await DiscountCard.update(newInfo, { where: { id: employeeId } });
    }
    const employees = await DiscountCard.findAll({
      where: {
        userStatus: {
          [Op.not]: 'Клиент',
        },
      },
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
      ],
      raw: true,
    });

    res.json(employees);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({ error: 'Произошла ошибка на сервере' });
  }
});

module.exports = router;
