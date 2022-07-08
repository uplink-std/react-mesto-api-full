const { httpStatus } = require('../utils/constants');
const MestoError = require('./mesto-error');

class NotFoundError extends MestoError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.notFound;
  }
}

module.exports = NotFoundError;
