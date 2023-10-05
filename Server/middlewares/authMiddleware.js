const jwt = require('jsonwebtoken');

function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800000s' });
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('====>', token);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { generateToken, authenticateJWT };
