const { Joi } = require('celebrate');

const emailValidator = Joi.string().email();

const passwordValidator = Joi.string().min(2);

const nameValidator = Joi.string().min(2).max(30);

const aboutValidator = Joi.string().min(2).max(30);

const urlPattern = /^(https?:\/\/\w+[.\-\w\d\]*)+(/[\-._~:/?#[\]@!$&'()*+,;=]*)*$/;
const urlValidator = Joi.string().pattern(urlPattern);

const idValidator = Joi.string().hex().length(24);

module.exports = {
  urlPattern,
  emailValidator,
  passwordValidator,
  nameValidator,
  aboutValidator,
  urlValidator,
  idValidator,
};
