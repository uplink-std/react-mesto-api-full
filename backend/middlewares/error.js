const ServerError = require('../errors/server-error');
const MestoError = require('../errors/mesto-error');

function isNotMestoError(error) {
  return !(error instanceof MestoError);
}

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  let error = err;
  if (isNotMestoError(err)) {
    error = new ServerError('Ошибка на стороне сервера.');
  }
  res.status(error.statusCode || 500);
  res.send({ message: error.message });
};

module.exports = { errorMiddleware };
