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
        .pattern(/^https?:\/\/[a-z0-9\W\_]+#?$/i, "url"),
    }),
  }),
  auth,
  updateAvatar
);

module.exports = router;
