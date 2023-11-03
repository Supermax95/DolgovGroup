const router = require('express').Router();
const { Manager } = require('../../db/models');

module.exports = router.put('/info/', async (req, res) => {
  const { managerId, newLastName, newFirstName, newMiddleName } = req.body;
  //const { oldPassword, newPassword } = req.body;

  try {
    const manager = await Manager.findOne({ where: { id: managerId } });

    if (!manager) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const lastNameUpdate = await manager.update({
      lastName: newLastName,
    });
    //console.log('================>lastNameUpdate', lastNameUpdate);

    const firstNameUpdate = await manager.update({
      firstName: newFirstName,
    });
    // console.log('===========>firstNameUpdate', firstNameUpdate);

    const middleNameUpdate = await manager.update({
      middleName: newMiddleName,
    });

    // console.log('====>middleNameUpdate', middleNameUpdate);

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
