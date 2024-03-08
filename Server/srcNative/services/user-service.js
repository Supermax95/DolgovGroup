require('dotenv').config();

const { PORT, IP } = process.env;

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');
// const TokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const { DiscountCard } = require('../../db/models');
const ApiError = require('../middlewares/error-middleware');
const tokenService = require('./token-service');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;

class UserService {
  async registration(
    lastName,
    firstName,
    middleName,
    email,
    birthDate,
    password,
    phoneNumber
  ) {
    const userByEmail = await DiscountCard.findOne({ where: { email } });
    if (userByEmail) {
      throw `Пользователь с такой электронной почтой ${email} уже существует`;
    }

    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Удаление первой цифры "7" из номера телефона
    const trimmedPhoneNumber = cleanedPhoneNumber.substring(1);

    const userByPhoneNumber = await DiscountCard.findOne({
      where: { phoneNumber: trimmedPhoneNumber },
    });
    if (userByPhoneNumber) {
      throw `Пользователь с таким номером телефона ${phoneNumber} уже существует`;
    }

    const hash = await bcrypt.hash(password, 10);

    const activationLink = uuid.v4();
    const user = await DiscountCard.create({
      lastName,
      firstName,
      middleName,
      email,
      birthDate,
      password: hash,
      activationLink,
      phoneNumber: trimmedPhoneNumber,
    });
    await MailService.sendActivationMail(
      email,
      `http://${IP}:${PORT}/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    return {
      user: userDto,
    };
  }

  // async activate(activationLink) {
  //   const user = await DiscountCard.findOne({ where: { activationLink } });
  //   console.log('activate user'user)
  //   if (!user) {
  //     throw 'Некорректная ссылка активации';
  //   }
  //   else
  //   user.isActivated = true;
  //   await user.save();
  // }

  // async activate(activationLink) {
  //   try {
  //     const user = await DiscountCard.findOne({ where: { activationLink } });

  //     if (!user) {
  //       throw 'Некорректная ссылка активации';
  //     }

  //     const userDataFile = path.join(__dirname, '../../userCards/data.json');
  //     console.log('======>', userDataFile);
  //     const userData = JSON.parse(await fs.readFile(userDataFile, 'utf8'));

  //     async function generateUniqueBarcode() {
  //       const minBarcode = 3200000000001;
  //       const maxBarcode = 3200000999999;
  //       const newBarcode = Math.floor(Math.random() * (maxBarcode - minBarcode + 1)) + minBarcode;
  //       return newBarcode.toString();
  //     }

  //     async function barcodeExists(barcode, users) {
  //       return users.some(user => user.cardInfo[0].barcode === barcode);
  //     }

  //     async function isBarcodeInDatabase(barcode) {
  //       const userWithBarcode = await DiscountCard.findOne({ where: { barcode } });
  //       return userWithBarcode !== null;
  //     }

  //     console.time('activate'); // Начало таймера

  //     const matchingUser = userData.find(dataUser => {
  //       return (

  //         user.phoneNumber === dataUser.cardInfo[0].phoneNumber.substring(1)
  //       );
  //     });

  //     console.timeEnd('activate');
  //     console.log('======>', matchingUser);

  //     if (matchingUser) {
  //       // Преобразовываем в строки перед сравнением
  //       if (user.barcode.toString() !== matchingUser.cardInfo[0].barcode.toString()) {
  //         user.barcode = matchingUser.cardInfo[0].barcode.toString();
  //       }
  //     } else {
  //       let uniqueBarcode;
  //       do {
  //         uniqueBarcode = await generateUniqueBarcode();
  //       } while (await barcodeExists(uniqueBarcode, userData) || await isBarcodeInDatabase(uniqueBarcode));

  //       user.barcode = uniqueBarcode;
  //     }

  //     user.isActivated = true;
  //     await user.save();
  //   } catch (error) {
  //     console.error(`Ошибка активации: ${error}`);
  //     throw 'Произошла ошибка при активации пользователя';
  //   }
  // }

  async activate(activationLink) {
    try {
      // Функция для поиска записей по номеру телефона
      function searchByPhoneNumber(indexes, query) {
        const { indexPhoneNumber } = indexes;
        const phoneNumberResults = indexPhoneNumber[query.phoneNumber] || [];
        return phoneNumberResults;
      }

      // Функция для построения индекса по номеру телефона
      async function buildPhoneNumberIndex(records) {
        const indexPhoneNumber = {};
        records.forEach((record) => {
          const phoneNumber = record.cardInfo[0].phoneNumber.substring(1);
          if (!indexPhoneNumber[phoneNumber]) {
            indexPhoneNumber[phoneNumber] = [];
          }
          indexPhoneNumber[phoneNumber].push(record);
        });
        return { indexPhoneNumber };
      }

      // Функция для генерации уникального штрихкода
      // async function generateUniqueBarcode() {
      //   const minBarcode = 3200000000001;
      //   const maxBarcode = 3200000999999;
      //   const newBarcode =
      //     Math.floor(Math.random() * (maxBarcode - minBarcode + 1)) +
      //     minBarcode;
      //   return newBarcode.toString();
      // }

      async function generateUniqueBarcode() {
        const minBarcode = 340000000000;
        const maxBarcode = 340000099999;

        // Генерируем случайный штрихкод в основном диапазоне
        const newBarcode =
          Math.floor(Math.random() * (maxBarcode - minBarcode + 1)) +
          minBarcode;

        // Преобразовываем штрихкод в строку и добавляем контрольную цифру
        const barcodeWithChecksum = `${newBarcode}${calculateEAN13Checksum(
          newBarcode
        )}`;

        return barcodeWithChecksum;
      }

      // Функция для расчета контрольной цифры EAN-13
      function calculateEAN13Checksum(barcode) {
        const digits = barcode.toString().split('').map(Number);

        let sum = 0;
        for (let i = digits.length - 1; i >= 0; i--) {
          sum += i % 2 === 0 ? digits[i] : digits[i] * 3;
        }

        const checksum = (10 - (sum % 10)) % 10;

        return checksum;
      }

      // Функция для проверки существования штрихкода в массиве пользователей
      async function barcodeExists(barcode, users) {
        return users.some((user) => user.cardInfo[0].barcode === barcode);
      }

      // Функция для проверки существования штрихкода в базе данных
      async function isBarcodeInDatabase(barcode) {
        const userWithBarcode = await DiscountCard.findOne({
          where: { barcode },
        });
        return userWithBarcode !== null;
      }

      // Загрузка данных пользователя
      const user = await DiscountCard.findOne({ where: { activationLink } });
      if (!user) {
        throw 'Некорректная ссылка активации';
      }

      const userDataFilePath = path.join(
        __dirname,
        '../../userCards/data.json'
      );
      console.log('======>', userDataFilePath);

      // Чтение файла с использованием fs.readFile
      const userData = JSON.parse(await fs.readFile(userDataFilePath, 'utf8'));

      // Построение индекса по номеру телефона
      const phoneNumberIndex = await buildPhoneNumberIndex(userData);

      // Поиск пользователя по номеру телефона
      console.time('activate');

      const matchingUser = searchByPhoneNumber(phoneNumberIndex, {
        phoneNumber: user.phoneNumber,
      })[0];

      console.timeEnd('activate');
      console.log('======>', matchingUser);

      // Логика активации

      if (matchingUser) {
        if (
          user.barcode.toString() !==
          matchingUser.cardInfo[0].barcode.toString()
        ) {
          user.barcode = matchingUser.cardInfo[0].barcode.toString();
        }
      } else {
        let uniqueBarcode;
        do {
          uniqueBarcode = await generateUniqueBarcode();
        } while (
          (await barcodeExists(uniqueBarcode, userData)) ||
          (await isBarcodeInDatabase(uniqueBarcode))
        );

        user.barcode = uniqueBarcode;
      }
      user.isActivated = true;

      //!!!ЭТО 1С не трогать
      // {retailServer}/{retailDatabase}/hs/loyaltyservice/issueclientcard?Phone={phoneNumber}&Email={email}&Client={clientFullName}&DateOfBirth={dateOfBirth}&ClientCardID={barcode}
      function formatBirthDate(inputDate) {
        const dateParts = inputDate.split('-');
        if (dateParts.length === 3) {
          const [year, month, day] = dateParts;
          const formattedDate = `${day}.${month}.${year}`;
          return formattedDate;
        } else {
          throw new Error('Некорректный формат даты.');
        }
      }

      const formattedBirthDate = formatBirthDate(user.birthDate);

      const credentials = 'Личкаб:Ko9dyfum';
      const base64Credentials = Buffer.from(credentials).toString('base64');
      await axios.post(
        `http://retail.dolgovagro.ru/retail2020/hs/loyaltyservice/issueclientcard?Phone=${
          '+7' + user.phoneNumber
        }&Email=${
          user.email
        }&Client=${`${user.lastName} ${user.firstName} ${user.middleName}`}&DateOfBirth=${formattedBirthDate}&ClientCardID=${
          user.barcode
        }`,
        {},
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      await user.save();
    } catch (error) {
      console.error(`Ошибка активации: ${error}`);
      throw 'Произошла ошибка при активации пользователя';
    }
  }

  async login(email, password) {
    const user = await DiscountCard.findOne({ where: { email } });
    if (!user) {
      throw 'Пользователь с данным e-mail не найден';
    }

    const isPassEquels = await bcrypt.compare(password, user.password);
    if (!isPassEquels) {
      throw 'Пароль введён неверно';
    }

    if (!user.isActivated) {
      const userDto = new UserDto(user);
      return {
        user: userDto,
        activationError: 'Аккаунт не активирован',
      };
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  // async refresh(refreshToken) {
  //   if (!refreshToken) {
  //     throw ApiError.UnauthorizedError();
  //   }
  //   const userData = tokenService.validateRefreshToken(refreshToken);
  //   const tokenFromBd = await tokenService.findToken(refreshToken);
  //   if (!userData || !tokenFromBd) {
  //     throw ApiError.UnauthorizedError();
  //   }
  //   const user = await DiscountCard.findById(userData.id);
  //   const userDto = new UserDto(user);
  //   const tokens = tokenService.generateTokens({ ...userDto });
  //   await tokenService.saveToken(userDto.id, tokens.refreshToken);
  //   return {
  //     ...tokens,
  //     user: userDto,
  //   };
  // }

  async newPassword(email) {
    function generateNewPassword(length = 6) {
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let newPassword = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newPassword += charset[randomIndex];
      }
      return newPassword;
    }
    const newPassword = generateNewPassword();
    const hash = await bcrypt.hash(newPassword, 10);
    const user = await DiscountCard.findOne({ where: { email } });
    if (!user) {
      throw 'Пользователь с указанным email не существует';
    } else if (user.isActivated === false || user.isActivated === null) {
      throw 'Аккаунт не активен';
    }
    await DiscountCard.update({ password: hash }, { where: { email } });
    await MailService.sendNewPasswordMail(email, newPassword);

    console.log('Новый пароль успешно установлен и отправлен по почте');
  }
}

module.exports = new UserService();
