const router = require("express").Router();
const auth = require("../middlewares/auth");
const { celebrate, Joi } = require("celebrate");
const {
  likeCard,
  dislikeCard,
  getCards,
  createCards,
  deleteCards,
} = require("../controllers/cards");

router.get(
  "/cards",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
  }),
  auth,
  getCards
);
router.post(
  "/cards",
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
        .pattern(/^https?:\/\/[a-z0-9\W\_]+#?$/i, "url"),
    }),
  }),
  auth,
  createCards
);
router.delete(
  "/cards/:cardId",
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
  auth,
  deleteCards
);
router.put(
  "/cards/:cardId/likes",
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
  auth,
  likeCard
);
router.delete(
  "/cards/:cardId/likes",
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
  auth,
  dislikeCard
);

module.exports = router;
