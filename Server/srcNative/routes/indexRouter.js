const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.post('/refresh', UserController.refresh);
router.post('/new-password', UserController.newPassword);
router.get('/', (req, res) => {
  const data = {
    message: 'Привет от сервера!',
    someOtherData: 'Дополнительные данные',
  };
  res.json(data);
});

module.exports = router;
