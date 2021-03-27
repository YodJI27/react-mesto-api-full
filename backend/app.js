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

const app = express();

const PORT = 3000;

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

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});
app.use(requestLogger);

app.use("/", auth, userRouter);
app.use("/", auth, cardsRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
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
      password: Joi.string().alphanum().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^https?\:\/\/(www\.)?[(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}]+\.[a-z]{2,6}(([(a-z0-9\-\.\_~:/?#\[\]@!$&'\(\)*+,;=){1,}])+)?#?$/gi,
        "url"
      ),
    }),
  }),
  createProfile
);

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
