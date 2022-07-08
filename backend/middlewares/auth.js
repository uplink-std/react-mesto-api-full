const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const { handleError } = require('../utils/errors');
const AuthError = require('../errors/auth-error');

const authMiddleware = (req, res, next) => {
  try {
    req.user = jwt.verify(req.cookies.jwt, JWT_SECRET);
    next();
  } catch (error) {
    handleError(new AuthError('Ошибка авторизации'), res, next);
  }
};

module.exports = { authMiddleware };
