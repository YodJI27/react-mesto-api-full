const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getUsers,
  getProfile,
  updatePrfoile,
  updateAvatar,
  getUsersMe,
} = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");

router.get(
  "/users",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
  }),
  auth,
  getUsers
);
router.get(
  "/users/:id",
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
  auth,
  getProfile
);

router.patch(
  "/users/me",
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
  auth,
  updatePrfoile
);
router.get(
  "/users/me",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
  }),
  auth,
  getUsersMe
);
router.patch(
  "/users/me/avatar",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(
          /^https?\:\/\/(www\.)?[(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}]+\.[a-z]{2,6}(([(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}])+)?#?$/gi,
          "url"
        ),
    }),
  }),
  auth,
  updateAvatar
);

module.exports = router;
