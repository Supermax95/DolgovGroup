require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// token

// Require routes
const indexRouter = require('./routes/index.router');
const registerRouter = require('./routes/registerRouter');
const authRouter = require('./routes/authRouter');

const { PORT, IP } = process.env;

const app = express();

app.use(
  cors({
    origin: `http://${IP}:8081`,
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/', registerRouter);
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Сервер крутится на ${PORT} порту`);
});
