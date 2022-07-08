const { httpStatus } = require('../utils/constants');
const MestoError = require('./mesto-error');

class BadRequestError extends MestoError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.badRequest;
  }
}

module.exports = BadRequestError;
