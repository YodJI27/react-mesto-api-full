const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getProfile,
  updatePrfoile,
  updateAvatar,
  getUsersMe,
} = require('../controllers/users');

router.get(
  '/users',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
  }),
  getUsers,
);
router.get(
  '/users/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
  }),
  getUsersMe,
);

router.get(
  '/users/:id',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    params: Joi.object().keys({
      id: Joi.string().alphanum().required().length(24),
    }),
  }),
  getProfile,
);

router.patch(
  '/users/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required(),
    }),
  }),
  updatePrfoile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/^https?\:\/\/(www\.)?[(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}]+\.[a-z]{2,6}(([(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}])+)?#?$/gi, 'url'), // eslint-disable-line
    }),
  }),
  updateAvatar,
);

module.exports = router;
