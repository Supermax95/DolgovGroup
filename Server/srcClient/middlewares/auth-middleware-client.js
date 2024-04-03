function checkUser(req, res, next) {
  if (!req.session || !req.session.idManager) {
    res.status(401).json({ message: 'Пользователь не авторизован' });
  } else {
    next();
  }
}

module.exports = checkUser;
