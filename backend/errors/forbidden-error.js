const { httpStatus } = require('../utils/constants');
const MestoError = require('./mesto-error');

class ForbiddenError extends MestoError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.forbidden;
  }
}

module.exports = ForbiddenError;
