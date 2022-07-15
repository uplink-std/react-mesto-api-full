const Card = require('../models/card');
const { httpStatus } = require('../utils/constants');
const { handleNotFound, handleError } = require('../utils/errors');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(httpStatus.ok).send(cards))
    .catch((error) => handleError(error, res, next));
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ owner, name, link })
    .then((card) => res.status(httpStatus.created).send(card))
    .catch((error) => handleError(error, res, next));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then(handleNotFound)
    .then((card) => {
      if (String(card.owner._id) !== String(req.user._id)) {
        throw new ForbiddenError('Нельзя удалить карту другого пользователя');
      }
      return card.remove();
    })
    .then((card) => res.status(httpStatus.ok).send(card))
    .catch((error) => handleError(error, res, next));
};

const likeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then(handleNotFound)
    .then((card) => res.status(httpStatus.ok).send(card))
    .catch((error) => handleError(error, res, next));
};

const dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then(handleNotFound)
    .then((card) => res.status(httpStatus.ok).send(card))
    .catch((error) => handleError(error, res, next));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
