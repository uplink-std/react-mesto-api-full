const { httpStatus } = require('../utils/constants');
const MestoError = require('./mesto-error');

class UserExistsError extends MestoError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.conflict;
  }
}

module.exports = UserExistsError;
