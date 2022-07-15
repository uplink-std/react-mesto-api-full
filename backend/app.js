const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const {
  createUser,
  login,
  logout,
} = require('./controllers/users');
const { authMiddleware } = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const {
  nameValidator,
  aboutValidator,
  urlValidator,
  emailValidator,
  passwordValidator,
} = require('./utils/joi-validation');
const { handleError } = require('./utils/errors');
const { errorMiddleware } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGODB_URL = 'mongodb://localhost:27017/mestodb', CORS_CONFIG_ORIGIN = false } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors({
  origin: CORS_CONFIG_ORIGIN,
  credentials: true,
}));

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: nameValidator,
      about: aboutValidator,
      avatar: urlValidator,
      email: emailValidator.required(),
      password: passwordValidator.required(),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: emailValidator.required(),
      password: passwordValidator.required(),
    }),
  }),
  login,
);
app.use(authMiddleware);
app.post(
  '/signout',
  logout,
);
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.use((req, res, next) => handleError(new NotFoundError('Ресурс не найден'), res, next));
app.use(errorLogger);
app.use(errors());

app.use(errorMiddleware);

mongoose.set('runValidators', true);
mongoose.connect(MONGODB_URL);

app.listen(PORT);
