const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Manager } = require('../../db/models');

module.exports = router.put('/info/', async (req, res) => {
  const { managerId, newLastName, newFirstName, newMiddleName } = req.body;
  try {
    const manager = await Manager.findOne({ where: { id: managerId } });

    if (!manager) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    await manager.update({
      lastName: newLastName,
    });
    await manager.update({
      firstName: newFirstName,
    });
    await manager.update({
      middleName: newMiddleName,
    });

    return res.status(200).json({
      lastName: newLastName,
      firstName: newFirstName,
      middleName: newMiddleName,
      message: 'Фамилия, имя и отчество успешно изменены',
    });
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
});

router.put('/password/', async (req, res) => {
  const { managerId, oldPassword, newPassword } = req.body;

  try {
    const manager = await Manager.findOne({ where: { id: managerId } });

    if (!manager) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, manager.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Старый пароль неверен' });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await manager.update({ password: hash });

    res.status(200).json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
});
