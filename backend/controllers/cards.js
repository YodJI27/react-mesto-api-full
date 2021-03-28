const Cards = require("../models/cards");
const NotFoundError = require("../errors/NotFoundError");

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;

  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCards = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError("Карточка не найдена"))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(400).send({ message: "Недостаточно прав" });
      }
      return Card.deleteOne({ _id: cardId })
        .then((response) => {
          if (response.deletedCount !== 0) {
            return res.status(200).send({ message: "Карточка удалена" });
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError("Нет карточки с таким id");
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
  .then((card) => {
    if (card) {
      return res.status(200).send(card);
    }
    throw new NotFoundError("Нет карточки с таким id");
  })
  .catch(next);
};
