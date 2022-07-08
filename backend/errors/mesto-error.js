const { httpStatus } = require('../utils/constants');

class MestoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.serverError;
  }
}

module.exports = MestoError;
