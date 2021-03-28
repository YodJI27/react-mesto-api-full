const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const NotFoundError = require("../errors/NotFoundError");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((_) => res.status(500).send({ message: "Что-то пошло не так" }));
  }

module.exports.getProfile = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданный id не корректен" });
      }
      return res.status(500).send({ message: "Что-то пошло не так" });
    });
  }

  module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error("Неправильные почта или пароль"));
            }
            const { JWT_SECRET } = process.env;
            const NODE_ENV = 'dev';
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
              { expiresIn: '7d' },
            );
            return res.status(200).send({ token });
          });
      })
      .catch(next);
  };
module.exports.createProfile = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((data) => {
      if (data && data.email === email) {
        return res.status(401).send("Пользователь уже создан");
      }
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name, about, avatar, email, password: hash,
          })
            .then((user) => {
              res.status(200).send(user);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};
// обновление пользовательских данных
module.exports.updatePrfoile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findOneAndUpdate(
    { _id: userId },
    { name, about },
    { new: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findOneAndUpdate(
    { _id: userId },
    { avatar },
    { new: true }, // метод update не валидирует данные при обновлении по умолчанию
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.getUsersMe = (req, res, next) => {
  const currentUserId = mongoose.Types.ObjectId(req.user._id);
  User.findById(currentUserId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      return res.status(200).send(user);
    })
    .catch(next);
};
