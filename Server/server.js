require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

//* Require routes ReactNative
const indexRouter = require('./srcNative/routes/indexRouter');
const activateRouter = require('./srcNative/routes/activateRouter');
const userProfileRouter = require('./srcNative/routes/userProfileRouter');
const locationUserRouter = require('./srcNative/routes/locationsUserRouter');
const checkUserNative = require('./srcNative/routes/checkRouter');
const sendNewActivationLink = require('./srcNative/routes/sendActivationLinkRouter');
const supportNodemailerRouter = require('./srcNative/routes/supportNodemailerRouter');
// ? Require Routes React
const locationRouter = require('./srcClient/routes/locationsRouter');
const portalRouter = require('./srcClient/routes/portalRouter');
const clientsRouter = require('./srcClient/routes/clientsRouter');
const employeeRouter = require('./srcClient/routes/employeeRouter');
const profileManager = require('./srcClient/routes/editProfileManagerRouter');
const nodemailerRouterClient = require('./srcClient/routes/nodemailerRouter');
const managementRouter = require('./srcClient/routes/managementRouter');
const productsRouter = require('./srcClient/routes/productsRouter');
const multerRouter = require('./srcClient/routes/multerRouter');
const categoryRouter = require('./srcClient/routes/categoryRouter');
const subcategoryRouter = require('./srcClient/routes/sucategoryRouter');
const promotionRouter = require('./srcClient/routes/promotionsRouter');
const lawsRouter = require('./srcClient/routes/lawsRouter');
const questionRouter = require('./srcClient/routes/quesionRouter')
// middleware
const errorMiddleware = require('./srcNative/middlewares/error-middleware');

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

//* ReactNative
app.use(
  cors({
    origin: [
      `http://${IP}:8081`,
      `http://${IP}:5173`,
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  })
);

app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Routes ReactNative
app.use('/uploads/', express.static('uploads'));
app.use('/api', indexRouter);
app.use('/', activateRouter);
app.use('/', userProfileRouter);
app.use('/', locationUserRouter);
app.use('/', checkUserNative);
app.use('/', sendNewActivationLink);
app.use('/', supportNodemailerRouter);
app.use(errorMiddleware);

// ? Routes React
app.use('/', locationRouter);
app.use('/portal', portalRouter);
app.use('/', clientsRouter);
app.use('/', employeeRouter);
app.use('/profileManager', profileManager);
app.use('/', nodemailerRouterClient);
app.use('/management', managementRouter);
app.use('/', productsRouter);
app.use('/', multerRouter);
app.use('/', categoryRouter);
app.use('/', subcategoryRouter);
app.use('/', promotionRouter);
app.use('/', lawsRouter);
app.use('/',questionRouter);

app.listen(PORT, () => {
  console.log(`Сервер крутится на ${PORT} порту`);
});
