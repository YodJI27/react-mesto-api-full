require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createProfile } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: ['*'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};
app.use('*', cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// авторизация
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().alphanum().required().min(8),
    }),
  }),
  login,
);
// регистрация
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().alphanum().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^https?:\/\/[a-z0-9\W]+#?$/i, 'url'),
    }),
  }),
  createProfile,
);
app.use('/', auth, userRouter);
app.use('/', auth, cardsRouter);
app.use('/*', () => {
  throw new NotFoundError('"Запрашиваемый ресурс не найден"');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT);
