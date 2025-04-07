function checkUser(req, res, next) {
  // Закомментируйте условие if и else, чтобы они не отрабатывали

  // if (!req.session || !req.session.idManager) {
  //   res.status(401).json({ message: 'Пользователь не авторизован' });
  // } else {
  //   next();
  // }

  // Всегда вызывайте next(), чтобы продолжить выполнение следующих мидлваров
  next();
}

module.exports = checkUser;
