const { PORT, IP } = process.env;
const router = require('express').Router();
const uuid = require('uuid');
const { DiscountCard } = require('../../db/models');
const MailService = require('../services/mail-service');

router.post('/sendNewActivationLink/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await DiscountCard.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const newActivationLink = uuid.v4();
    user.activationLink = newActivationLink;
    await user.save();

    await MailService.sendActivationMail(
      user.email,
      // `http://${IP}:${PORT}/api/activate/${newActivationLink}`
      `https://${IP}:${PORT}/api/activate/${newActivationLink}`
    );

    return res
      .status(200)
      .json({ message: 'Новая ссылка для активации аккаунта отправлена' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
