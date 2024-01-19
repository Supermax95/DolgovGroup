const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log('req.headers', req.headers);
    console.log('authorizationHeader', authorizationHeader);
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    console.log('accessToken', accessToken);
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    console.log('userData', userData);

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
