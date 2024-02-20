// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('Products', [
//       const seedData = [];
//       for (let i = 1; i <= 100; i++) {
//         const seed = {
//           id: i,
//           article: `article_${i}`,
//           productName: `Product ${i}`,
//           promoStartDate: '2024-02-18',
//           promoEndDate: '2024-02-18',
//           originalPrice: 45.0,
//           customerPrice: 45.0,
//           employeePrice: 35.0,
//           isNew: true,
//           isDiscounted: false,
//           description: '<h3><strong>Пищевая ценность<\/strong>&nbsp;на 100 г<\/h3><p>Белки:<strong>3.0 г<\/strong><\/p><p>Жиры: <strong>2.5 г<\/strong><\/p><p>Углеводы:<strong>16.3 г<\/strong><\/p><p>Калорийность: <strong>99.0 ккал<\/strong><\/p><h2><strong><em>Все о товаре<\/em><\/strong><\/h2><p><strong>Состав<\/strong><\/p><h3>Молоко цельное, молоко обезжиренное, сахар-песок, наполнитель (сахар, малина, черника, вода, крахмал, натур ароматизатор краситель - концентрат из черной моркови и бузины), стабилизатор консистенции, ароматизатор клюква , закваска чистых культур термофильного стрептококка и болгарской палочки.<\/h3><p><strong>Общая информация<\/strong><\/p><p><strong>Бренд: <\/strong><span style=\"color: var(--textAccent);\">Нежинская<\/span><\/p><p><strong>Производитель: <\/strong>Гусевмолоко ООО<\/p><p><strong>Страна: <\/strong>Россия<\/p><p><strong>Тип продукта: <\/strong>Йогурт<\/p><p><strong>Вид йогурта: <\/strong>Питьевой<\/p><p><strong>Вкус\/Добавки: <\/strong>Лесные ягоды<\/p><p><strong>Жирность:<\/strong>2,5 %<\/p><p><strong>Вес: <\/strong>275.0 г<\/p><p><strong>Тип сырья: <\/strong>Коровье<\/p><p><strong>Способ изготовления: <\/strong>Резервуарный<\/p><p><strong>Возраст ребенка: <\/strong>С 5 лет<\/p><p><strong>Вид упаковки: <\/strong>Пластиковая бутылка<\/p><p><strong>Условия хранения: <\/strong>При температуре от +2°С до +5°С<\/p><p><strong>Срок хранения: <\/strong>10.0 сут<\/p><p><strong>Условия хранения 2: <\/strong>После вскрытия упаковки хранить при температуре от +2°С до +5°С<\/p><p><strong>Срок хранения 2: <\/strong>1 сутки<\/p><h3><strong>Описание<\/strong><\/h3><p>Йогурт питьевой со вкусом лесных ягод с массовой долей жира 2,5%. Перед употреблением взболтать.<\/p>',
//           photo: `/uploads/product/ÐÐµÐ¶Ð¸Ð½ÑÐºÐ°Ñ.jpeg`,
//           invisible: false,
//           subcategoryId: 3,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         };
//       {
//         article: '123654',
//         productName:
//           'Продукт творожный Даниссимо с хрустящими шоколадными шариками 7.2%, 130г',
//         promoStartDate: '2023-01-01',
//         promoEndDate: '2023-01-15',
//         originalPrice: 80,
//         customerPrice: 80,
//         employeePrice: 50,
//         isNew: true,
//         isDiscounted: false,
//         description:
//           'Удивительному нужно время. Поэтому мы готовим Даниссимо творожный 20 часов. Нежная текстура сливочного творожка и хрустящие шарики, покрытые изысканным шоколадом, подарят момент истинного удовольствия от каждой ложечки.',
//         photo: null,
//         invisible: false,
//         subcategoryId: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         article: '654123',
//         productName: 'Йогурт Teos Греческий 2%, 140г',
//         promoStartDate: '',
//         promoEndDate: '',
//         originalPrice: 45,
//         customerPrice: 35,
//         employeePrice: 25,
//         isNew: true,
//         isDiscounted: true,
//         description:
//           'Греческий йогурт производится традиционным способом из натуральных компонентов без использования стабилизаторов, искусственных красителей и ароматизаторов и сухого молока. Начните день со здорового завтрака и зарядитесь пользой на весь день!',
//         photo: null,
//         invisible: false,
//         subcategoryId: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         article: '789456',
//         productName:
//           'Колбаса сырокопчёная Ремит Trio mio в нарезке ассорти, 100г',
//         promoStartDate: '2023-02-01',
//         promoEndDate: '2023-02-15',
//         originalPrice: 200,
//         customerPrice: 200,
//         employeePrice: 100,
//         isNew: false,
//         isDiscounted: false,
//         description: 'Вкусная колбаса',
//         photo: null,
//         invisible: false,
//         subcategoryId: 4,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         article: '987456',
//         productName: 'Ветчина',
//         promoStartDate: '2023-02-01',
//         promoEndDate: '2023-02-15',
//         originalPrice: 350,
//         customerPrice: 350,
//         employeePrice: 150,
//         isNew: true,
//         isDiscounted: false,
//         description: 'Вкусная Ветчина',
//         photo: null,
//         invisible: false,
//         subcategoryId: 5,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         article: '748596',
//         productName: 'Буженина',
//         promoStartDate: '2023-02-01',
//         promoEndDate: '2023-02-15',
//         originalPrice: 300,
//         customerPrice: 210,
//         employeePrice: 150,
//         isNew: false,
//         isDiscounted: true,
//         description: 'Вкусная Буженина',
//         photo: null,
//         invisible: true,
//         subcategoryId: 6,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         article: '153246',
//         productName: 'Кефир',
//         promoStartDate: '2023-02-01',
//         promoEndDate: '2023-02-15',
//         originalPrice: 80,
//         customerPrice: 70,
//         employeePrice: 50,
//         isNew: false,
//         isDiscounted: false,
//         description: 'Вкусный Кефир',
//         photo: null,
//         invisible: true,
//         subcategoryId: 7,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         article: '158246',
//         productName: 'Кефир Особый',
//         promoStartDate: '2023-02-01',
//         promoEndDate: '2023-02-15',
//         originalPrice: 100,
//         customerPrice: 100,
//         employeePrice: 50,
//         isNew: false,
//         isDiscounted: false,
//         description: 'Особый Кефир',
//         photo: null,
//         invisible: false,
//         subcategoryId: 7,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]);
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Products', null, {});
//   },
// };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = [];

    for (let i = 0; i <= 100; i++) {
      const seed = {
        id: i,
        article: `ПГ000000901`,
        productName: `Йогурт питьевой Нежинская лесная ягода 2,5% БЗМЖ 275 г ${i}`,
        promoStartDate: '2024-02-18',
        promoEndDate: '2024-02-18',
        originalPrice: 45.0,
        customerPrice: 45.0,
        employeePrice: 35.0,
        isNew: true,
        isDiscounted: false,
        description:
          '<h3><strong>Пищевая ценность</strong>&nbsp;на 100 г</h3><p>Белки:<strong>3.0 г</strong></p><p>Жиры: <strong>2.5 г</strong></p><p>Углеводы:<strong>16.3 г</strong></p><p>Калорийность: <strong>99.0 ккал</strong></p><h2><strong><em>Все о товаре</em></strong></h2><p><strong>Состав</strong></p><h3>Молоко цельное, молоко обезжиренное, сахар-песок, наполнитель (сахар, малина, черника, вода, крахмал, натур ароматизатор краситель - концентрат из черной моркови и бузины), стабилизатор консистенции, ароматизатор клюква , закваска чистых культур термофильного стрептококка и болгарской палочки.</h3><p><strong>Общая информация</strong></p><p><strong>Бренд: </strong><span style="color: var(--textAccent);">Нежинская</span></p><p><strong>Производитель: </strong>Гусевмолоко ООО</p><p><strong>Страна: </strong>Россия</p><p><strong>Тип продукта: </strong>Йогурт</p><p><strong>Вид йогурта: </strong>Питьевой</p><p><strong>Вкус/Добавки: </strong>Лесные ягоды</p><p><strong>Жирность:</strong>2,5 %</p><p><strong>Вес: </strong>275.0 г</p><p><strong>Тип сырья: </strong>Коровье</p><p><strong>Способ изготовления: </strong>Резервуарный</p><p><strong>Возраст ребенка: </strong>С 5 лет</p><p><strong>Вид упаковки: </strong>Пластиковая бутылка</p><p><strong>Условия хранения: </strong>При температуре от +2°С до +5°С</p><p><strong>Срок хранения: </strong>10.0 сут</p><p><strong>Условия хранения 2: </strong>После вскрытия упаковки хранить при температуре от +2°С до +5°С</p><p><strong>Срок хранения 2: </strong>1 сутки</p><h3><strong>Описание</strong></h3><p>Йогурт питьевой со вкусом лесных ягод с массовой долей жира 2,5%. Перед употреблением взболтать.</p>',
        photo: `/uploads/product/ÐÐµÐ¶Ð¸Ð½ÑÐºÐ°Ñ.jpeg`,
        invisible: false,
        subcategoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      seedData.push(seed);
    }

    await queryInterface.bulkInsert('Products', seedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
