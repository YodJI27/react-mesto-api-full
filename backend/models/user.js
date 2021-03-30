const mongoose = require("mongoose");
const userValidator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(v) {
        return /^https?\:\/\/(www\.)?[(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}]+\.[a-z]{2,6}(([(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}])+)?#?$/gi.test(
          v
        );
      },
      message: "Ошибка валидации URL",
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator(v) {
        return userValidator.isEmail(v);
      },
      message: "Email некорректен",
    },
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    select: false,
    validate: {
      validator(v) {
        return /[a-z0-9]*/i.test(v);
      },
      message: "Пароль некорректен",
    },
  },
});
// в схеме select: false не срабатывает, поэтому модифицируем объект ответа
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("user", userSchema);
