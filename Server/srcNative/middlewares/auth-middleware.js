const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateRefreshToken(token);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

module.exports = authMiddleware;
