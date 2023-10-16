require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// token

// Require routes
// const indexrouter = require('./routes/index.router');
// const authRouter = require('./routes/authRouter');
const router = require('./routes');
const activateRouter = require('./routes/activateRouter');
const userProfileRouter = require('./routes/userProfileRouter');

// middleware
const errorMiddleware = require('./middlewares/error-middleware');

const { PORT, IP } = process.env;

const sessionConfig = {
  name: 'name',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

const app = express();

app.use(
  cors({
    origin: `http://${IP}:8081`,
    credentials: true,
  })
);

app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
// app.use('/', indexrouter);
app.use('/api', router);
app.use('/', activateRouter);
app.use('/', userProfileRouter);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Сервер крутится на ${PORT} порту`);
});
