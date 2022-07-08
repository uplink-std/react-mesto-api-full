const { httpStatus } = require('../utils/constants');
const MestoError = require('./mesto-error');

class ServerError extends MestoError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.serverError;
  }
}

module.exports = ServerError;
