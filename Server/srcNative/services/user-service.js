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

  async activate(activationLink) {
    const user = await DiscountCard.findOne({ where: { activationLink } });
    if (!user) {
      throw 'Некорректная ссылка активации';
    }
    user.isActivated = true;
    await user.save();
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

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromBd = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromBd) {
      throw ApiError.UnauthorizedError();
    }
    const user = await DiscountCard.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

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
