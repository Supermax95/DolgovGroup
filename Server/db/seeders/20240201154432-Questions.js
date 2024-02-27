'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          title: 'Пример1',
          description: 'Пример1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};

// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert(
//       'Questions',
//       [
//         {
//           title: 'Пример1',
//           description:
//             'Пример1',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title:
//             'Нужно ли получать новую карту, если есть действующая (Перекрёстка или Пятёрочки)?',
//           description:
//             'Если у вас уже есть любая из карт, ничего делать не нужно: вы можете использовать свою виртуальную или пластиковую карту «Перекрёстка» при покупках в «Пятёрочке», и наоборот.',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Как активировать карту?',
//           description:
//             'Активировать пластиковую карту «Х5 Клуба» вы можете в мобильном приложении или на сайте «Перекрёсток».',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Где можно посмотреть полные правила программы лояльности?',
//           description:
//             'Полные правила программы лояльности «Х5 Клуб»: x5club.ru',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           title: 'Карта утеряна/испорчена, что делать?',
//           description:
//             'Утерянную/испорченную карту необходимо заблокировать, чтобы нашедший не получил доступ к вашему балльному счёту. Сделать это можно по телефону горячей линии «Перекрёсток» 8-800-200-95-55. Далее нужно выпустить карту бесплатно в мобильном приложении или купить новую пластиковую карту и зарегистрировать её на тот же номер телефона, на который была зарегистрирована предыдущая карта. Тогда ваши баллы будут сохранены.',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Questions', null, {});
//   },
// };
