const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { defaults } = require('../utils/constants');
const AuthError = require('../errors/auth-error');
const { urlPattern } = require('../utils/joi-validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: defaults.user.username,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: defaults.user.about,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: defaults.user.avatar,
    validate: {
      validator: (urlInput) => urlPattern.test(urlInput),
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (emailInput) => isEmail(emailInput),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
