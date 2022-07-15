const httpStatus = {
  ok: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
};

const defaults = {
  user: {
    username: 'Жак-Ив Кусто',
    about: 'Исследователь',
    avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
};

const {
  JWT_SECRET = 'JWT_SECRET_KEY',
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

module.exports = {
  httpStatus,
  defaults,
  JWT_SECRET,
  PORT,
  MONGODB_URL,
};
