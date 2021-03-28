const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");
const NotFoundError = require("../errors/NotFoundError");

module.exports.getUsers = (req, res) =>
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((_) => res.status(500).send({ message: "Что-то пошло не так" }));

module.exports.getProfile = (req, res) =>
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

module.exports.createProfile = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email }).then((data) => {
    if (data && data.email === email) {
      return res.status(401).send("Пользователь уже создан");
    }
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        User.create({ name, about, avatar, email, password: hash, })
          .then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => {
            if (err.name === "ValidationError") {
              return res.status(400).send({ message: "Ошибка валидации" });
            }
            return res.status(500).send({ message: "Что-то пошло не так" });
          });
      })
      .catch(next);
  });
};
module.exports.updatePrfoile = (req, res) => {
  const { id } = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Пользователя c таким id не существует" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданный id не корректен" });
      }
      return res.status(500).send({ message: "Что-то пошло не так" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { id } = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Пользователя с таким id не существует" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданный id не корректен" });
      }
      return res.status(500).send({ message: "Что-то пошло не так" });
    });
};
// return Promise.reject(new Error("Неправильные почта или пароль"));
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            return Promise.reject(new Error("Неправильные почта или пароль"));
          }
          const { JWT_SECRET } = process.env;
          const NODE_ENV = "dev";
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
            { expiresIn: "7d" }
          );
          res.status(200).send({ token });
        })
        .catch((err) => {
          res.status(401).send({ message: err.message });
        });
    });
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
