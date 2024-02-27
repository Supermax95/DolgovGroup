const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('1', 10);
    const hashedPassword = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert('DiscountCards', [
      {
        lastName: 'Фамилия1',
        firstName: 'Имя1',
        middleName: 'Отчество1',
        birthDate: '1990-01-15',
        phoneNumber: '9219458686',
        email: 'email1@example.com',
        password: hash,
        photo: '',
        cardType: '',
        barcode: '3200000322311',
        bonusProgram: '',
        userStatus: 'Сотрудник',
        balance: 1000,
        isActivated: false,
        newEmail: '',
        activationLink: '',
        emailConfirmationCode: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiscountCards', null, {});
  },
};
// const bcrypt = require('bcrypt');

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const hash = await bcrypt.hash('1', 10);
//     const hashedPassword = await bcrypt.hash('123', 10);
//     await queryInterface.bulkInsert('DiscountCards', [
//       {
//         lastName: 'Фамилия1',
//         firstName: 'Имя1',
//         middleName: 'Отчество1',
//         birthDate: '1990-01-15',
//         phoneNumber: '9219458686',
//         email: 'email1@example.com',
//         password: hash,
//         photo: '',
//         cardType: '',
//         barcode: '3200000322311',
//         bonusProgram: '',
//         userStatus: 'Сотрудник',
//         balance: 1000,
//         isActivated: false,
//         newEmail: '',
//         activationLink: '',
//         emailConfirmationCode: '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         lastName: 'Фамилия2',
//         firstName: 'Имя2',
//         middleName: 'Отчество2',
//         birthDate: '1995-02-15',
//         phoneNumber: '9219458687',
//         email: 'email2@example.com',
//         password: hash,
//         photo: '',
//         cardType: '',
//         barcode: '3200000322312',
//         bonusProgram: '',
//         userStatus: 'Новый сотрудник',
//         balance: 2000,
//         isActivated: true,
//         newEmail: '',
//         activationLink: '',
//         emailConfirmationCode: '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         lastName: 'Фамилия3',
//         firstName: 'Имя3',
//         middleName: 'Отчество3',
//         birthDate: '1995-02-15',
//         phoneNumber: '9219458690',
//         email: 'email3@example.com',
//         password: hash,
//         photo: '',
//         cardType: '',
//         barcode: '3200000322313',
//         bonusProgram: '',
//         userStatus: 'Сотрудник',
//         balance: 3000,
//         isActivated: true,
//         newEmail: '',
//         activationLink: '',
//         emailConfirmationCode: '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         lastName: 'Фамилия4',
//         firstName: 'Имя3',
//         middleName: 'Отчество4',
//         birthDate: '1995-02-15',
//         phoneNumber: '9219458691',
//         email: 'email4@example.com',
//         password: hash,
//         photo: '',
//         cardType: '',
//         barcode: '3200000322314',
//         bonusProgram: '',
//         userStatus: 'Клиент',
//         balance: 4000,
//         isActivated: false,
//         newEmail: '',
//         activationLink: '',
//         emailConfirmationCode: '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         lastName: 'Фамилия5',
//         firstName: 'Имя5',
//         middleName: 'Отчество5',
//         birthDate: '1995-02-15',
//         phoneNumber: '9219458692',
//         email: 'email5@example.com',
//         password: hash,
//         photo: '',
//         cardType: '',
//         barcode: '3200000322315',
//         bonusProgram: '',
//         userStatus: 'Клиент',
//         balance: 5000,
//         isActivated: true,
//         newEmail: '',
//         activationLink: '',
//         emailConfirmationCode: '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]);
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('DiscountCards', null, {});
//   },
// };
// // const bcrypt = require('bcrypt');

// // module.exports = {
// //   up: async (queryInterface, Sequelize) => {
// //     const hash = await bcrypt.hash('1', 10);

// //     const seedData = [];

// //     // Создайте 50 записей со статусом "Клиент"
// //     for (let i = 1; i <= 100; i++) {
// //       const lastName = `Фамилия${i}`;
// //       const firstName = `Имя${i}`;
// //       const middleName = `Отчество${i}`;
// //       const birthDate = '1990-01-15';
// //       const email = `email${i}@example.com`;
// //       const password = hash;
// //       const photo = '';
// //       const cardType = '';
// //       const barcode = `3200000322318${i}`;
// //       const bonusProgram = '';
// //       const userStatus = 'Клиент';
// //       const balance = 1000 * i;
// //       const isActivated = false;
// //       const activationLink = '';
// //       const createdAt = new Date();
// //       const updatedAt = new Date();

// //       seedData.push({
// //         lastName,
// //         firstName,
// //         middleName,
// //         birthDate,
// //         email,
// //         password,
// //         photo,
// //         cardType,
// //         barcode,
// //         bonusProgram,
// //         userStatus,
// //         balance,
// //         isActivated,
// //         activationLink,
// //         createdAt,
// //         updatedAt,
// //       });
// //     }

// //     // Создайте еще 50 записей со статусом "Сотрудник"
// //     for (let i = 51; i <= 100; i++) {
// //       const lastName = `Фамилия${i}`;
// //       const firstName = `Имя${i}`;
// //       const middleName = `Отчество${i}`;
// //       const birthDate = '1990-01-15';
// //       const email = `email${i}@example.com`;
// //       const password = hash;
// //       const photo = '';
// //       const cardType = '';
// //       const barcode = `3200000322318${i}`;
// //       const bonusProgram = '';
// //       const userStatus = 'Сотрудник';
// //       const balance = 1000 * i;
// //       const isActivated = false;
// //       const activationLink = '';
// //       const createdAt = new Date();
// //       const updatedAt = new Date();

// //       seedData.push({
// //         lastName,
// //         firstName,
// //         middleName,
// //         birthDate,
// //         email,
// //         password,
// //         photo,
// //         cardType,
// //         barcode,
// //         bonusProgram,
// //         userStatus,
// //         balance,
// //         isActivated,
// //         activationLink,
// //         createdAt,
// //         updatedAt,
// //       });
// //     }

// //     await queryInterface.bulkInsert('DiscountCards', seedData);
// //   },

// //   async down(queryInterface, Sequelize) {
// //     await queryInterface.bulkDelete('DiscountCards', null, {});
// //   },
// // };
