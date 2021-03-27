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
      link: Joi.string().pattern(
        /^https?\:\/\/(www\.)?[(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}]+\.[a-z]{2,6}(([(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}])+)?#?$/gi,
        "url"
      ),
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
