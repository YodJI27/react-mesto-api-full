require('dotenv').config(); 
const express = require("express");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { login, createProfile } = require("./controllers/users");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/NotFoundError");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { celebrate, Joi } = require("celebrate");
const cors = require("cors");

const app = express();

const PORT = 3000;

const corsOptions = {
  origin: ["*"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization"],
};
app.use("*", cors(corsOptions));

mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB");
  });

app.use(bodyParser.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().alphanum().required().min(8),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().alphanum().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^https?:\/\/[a-z0-9\W\_]+#?$/i, "url"),
    }),
  }),
  createProfile
);
app.use("/", auth, userRouter);
app.use("/", auth, cardsRouter);
app.use((_) => {
  throw new NotFoundError('"Запрашиваемый ресурс не найден"');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res
    .status(500)
    .send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});
app.listen(PORT);
