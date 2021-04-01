const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  likeCard,
  dislikeCard,
  getCards,
  createCards,
  deleteCards,
} = require('../controllers/cards');

router.get(
  '/cards',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
  }),
  getCards,
);
router.post(
  '/cards',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/^https?:\/\/[a-z0-9\W]+#?$/i, 'url'),
    }),
  }),
  createCards,
);
router.delete(
  '/cards/:cardId',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  deleteCards,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  dislikeCard,
);

module.exports = router;
