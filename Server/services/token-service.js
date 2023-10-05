const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(discountCardId, refreshToken) {
    const tokenData = await Token.findOne({ where: { discountCardId } });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return tokenData;
    }

    const token = await Token.create({
      discountCardId,
      refreshToken,
    });
    return token;
  }
}

module.exports = new TokenService();
