const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/[a-z0-9\W]+#?$/i.test(
          v,
        );
      },
      message: 'Ошибка валидации URL',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
