require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// const session = require('express-session');
// const FileStore = require('session-file-store')(session);

// Require routes
const indexRouter = require('./routes/index.router');
const registerRouter = require('./routes/registerRouter');

// // Cookie
// const sessionConfig = {
//   name: 'Cookie',
//   store: new FileStore(),
//   secret: process.env.SESSION_SECRET ?? 'Секретное слово',
//   resave: false, // * если true, пересохранит сессию, даже если она не менялась
//   saveUninitialized: false, // * если false, куки появятся только при установке req.session
//   cookie: {
//     maxAge: 9999999, // * время жизни в мс (ms)
//     httpOnly: true,
//   },
// };

const { PORT, IP } = process.env;

const app = express();

app.use(
  cors({
    origin: `http://${IP}:8081`,
    credentials: true,
  }),
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session(sessionConfig)); // Подключаем сессии

// Routes
app.use('/', indexRouter);
app.use('/', registerRouter);

app.listen(PORT, () => {
  console.log(`Сервер крутится на ${PORT} порту`);
});
