#!/bin/bash
#  Файл выполняет установку sequelize для postgres, express, ReactSSR

# Для того что бы все сработало:
# 1) chmod +x miniScript_orig.sh  // файл по умолчанию не исполняемый, перед запуском выполнить эту команду в консоли где расположен файл.
# 2) кидаете его в корень нового проекта.
# 3) Теперь файл можно запускать, введя ./miniScript_orig.sh в консоли.

# нужно исправить sequelize rc
# сам секвалайз переписать на json по-хорошему
# и env переписать на обычный формат 

#mkdir -p server
#cd server


npm init -y
npx eslint --init
npx create-gitignore node 
npm i sequelize pg pg-hstore
npm i sequelize-cli 

npm i express morgan 
npm i -D nodemon

npm i cors

npm i dotenv express-session session-file-store bcrypt 


mkdir -p routes


# sessions в gitignore записать

# надо дописать в json

# "scripts": {
#     "test": "echo \"Error: no test specified\" && exit 1",
#    "start": "node server.js",
#     "dev": "nodemon server.js --ext js,jsx --ignore sessions"
#   },


echo "const path = require('path');
require('dotenv').config()

 module.exports = {
  'config': path.resolve('db',  'config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
 };" > .sequelizerc


npx sequelize-cli init

echo '{
  "development": {
    "use_env_variable": "DEV_DB_URL",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "TEST_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "PROD_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
   "seederStorage": "sequelize",
   "seederStorageTableName": "SequelizeData"
}' > ./db/config/database.json


echo "const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_URL);

module.exports = async function dbConnectCheck() {
  try {
    await sequelize.authenticate();
    console.log('БАЗА ПОДКЛЮЧЕНА!');
  } catch (error) {
    console.log('БАЗА НЕ ПОДКЛЮЧЕНА ==>', error);
  }
};" > db/dbConnectCheck.js 

echo 'PORT=3000
DEV_DB_URL=postgres://postgres:postgres@localhost:5432/db_exam_raccons
SECRET_KEY_SESSION=examRaccons'> .env 

echo 'PORT=3ХХХ
DEV_DB_URL=[dialect]://[user]:[password]@[hostname]:[PORT]/[db_name]
SECRET_KEY_SESSION=[кодовое слово]'> .env_example

echo "require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Require routes
const indexRouter = require('./routes/index.router');


// Cookie
const sessionConfig = {
  name: 'Cookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};

const { PORT } = process.env ?? 3000;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig)); // Подключаем сессии

// Routes
app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(\`Сервер крутится на \${PORT} порту\`);
});
"> ./server.js



echo "
const router = require('express').Router();

module.exports = router
  .get('/', (req, res) => {
    res.send('Работает');
  });
"> ./routes/index.router.js

# cd server

# exports DEV_DB_URL=postgres://postgres:postgres@localhost:5432/[dbName]
# npx sequelize-cli db:create
# npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string 

# npx sequelize-cli db:migrate 
# npx sequelize-cli db:seed:all   

# npm start Or npm run dev

### Создание клиента

# Нужно выйти в корень файла и сделать

# npm create vite@latest client -- --template react-ts

# Затем перейти к клиента и сделать
# npm i

#  /// добавить реакт роутер дом 
# и// редакс
