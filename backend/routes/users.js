const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getLoggedUser,
} = require('../controllers/users');

const {
  nameValidator,
  aboutValidator,
  urlValidator,
  idValidator,
} = require('../utils/joi-validation');

router.get('/', getUsers);
router.get('/me', getLoggedUser);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: idValidator.required(),
    }),
  }),
  getUserById,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: nameValidator.required(),
      about: aboutValidator.required(),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: urlValidator.required(),
    }),
  }),
  updateAvatar,
);

module.exports = router;
