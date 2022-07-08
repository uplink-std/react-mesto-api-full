const { httpStatus } = require('../utils/constants');
const MestoError = require('./mesto-error');

class AuthError extends MestoError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.unauthorized;
  }
}

module.exports = AuthError;
