const router = require('express').Router();
const bcrypt = require('bcrypt');
const { DiscountCard } = require('../db/models');

router.put('/newpassword/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await DiscountCard.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password); 

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Старый пароль неверен' });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hash });

    res.status(200).json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error('Произошла ошибка при изменении пароля:', error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});

module.exports = router;
