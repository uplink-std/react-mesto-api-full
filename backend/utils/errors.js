const { CastError, ValidationError } = require('mongoose').Error;
const NotFoundError = require('../errors/not-found-error');
const MestoError = require('../errors/mesto-error');
const BadRequestError = require('../errors/bad-request-error');
const ServerError = require('../errors/server-error');
const UserExistsError = require('../errors/user-exists-error');

const handleNotFound = (data) => {
  if (data == null) {
    throw new NotFoundError('Ресурс не найден');
  }
  return data;
};

const isNotMestoError = (error) => !(error instanceof MestoError);

const makeFromMongodbError = (error) => {
  if (error.code === 11000) {
    return new UserExistsError('Пользователь с таким адресом электронной почты уже зарегистрирован');
  }
  return new ServerError(`Ошибка при взаимодействии с базой данных: ${error.message}`);
};

const makeMestoError = (error) => {
  if (error instanceof CastError
    || error instanceof ValidationError) {
    return new BadRequestError(error.message);
  }
  if (error.name === 'MongoServerError') {
    return makeFromMongodbError(error);
  }
  return new ServerError('Ошибка на стороне сервера.');
};

const handleError = (err, res, next) => {
  let error = err;
  if (isNotMestoError(err)) {
    error = makeMestoError(err);
  }

  next(error);
};

module.exports = { handleNotFound, handleError };
