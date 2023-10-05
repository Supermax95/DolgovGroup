require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// token

// Require routes
// const indexrouter = require('./routes/index.router');
const router = require('./routes');
// const registerRouter = require('./routes/registerRouter');
// const authRouter = require('./routes/authRouter');

// middleware
const errorMiddleware = require('./middlewares/error-middleware');

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
app.use(cookieParser());

// Routes
// app.use('/', indexrouter);
app.use('/api', router);
// app.use('/', authRouter);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Сервер крутится на ${PORT} порту`);
});
