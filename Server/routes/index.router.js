const router = require('express').Router();

module.exports = router.get('/', (req, res) => {
  res.json('Lalala');
 // res.send('Работает');
});
