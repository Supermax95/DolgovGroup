const router = require('express').Router();

module.exports = router.get('/', (req, res) => {
  const data = {
    message: 'Привет от сервера!',
    someOtherData: 'Дополнительные данные',
  };
  res.json(data);
});
