const fs = require('fs');

// Чтение файла с использованием fs.readFile
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }

  const records = JSON.parse(data); // Преобразование данных из JSON

  // После чтения файла вызываем функцию buildIndexes с прочитанными данными
  const indexes = buildIndexes(records);
  const query = {
    lastName: 'Могтюнина',
    firstName: 'Ольга',
    phoneNumber: '89189076889',
  };
  console.time('activate'); // Начало таймера

  const results = searchRecords(indexes, query);
  console.timeEnd('activate');
});

function buildIndexes(records) {
  // Создаем пустые объекты для индексов
  const indexLastName = {};
  const indexFirstName = {};
  const indexPhoneNumber = {};

  // Проходимся по каждой записи в массиве
  records.forEach((record) => {
    // Индекс по фамилии
    if (!indexLastName[record.lastName]) {
      // Если индекса для этой фамилии еще нет
      indexLastName[record.lastName] = []; // Создаем пустой массив
    }
    indexLastName[record.lastName].push(record); // Добавляем запись в массив по соответствующему ключу

    // Индекс по имени
    if (!indexFirstName[record.firstName]) {
      // Если индекса для этого имени еще нет
      indexFirstName[record.firstName] = []; // Создаем пустой массив
    }
    indexFirstName[record.firstName].push(record); // Добавляем запись в массив по соответствующему ключу

    // Индекс по номеру телефона
    if (!indexPhoneNumber[record.cardInfo[0].phoneNumber]) {
      // Если индекса для этого номера телефона еще нет
      indexPhoneNumber[record.cardInfo[0].phoneNumber] = []; // Создаем пустой массив
    }
    indexPhoneNumber[record.cardInfo[0].phoneNumber].push(record); // Добавляем запись в массив по соответствующему ключу
  });

  // Возвращаем созданные индексы в виде объекта
  return { indexLastName, indexFirstName, indexPhoneNumber };
}

// Функция для поиска записей по фамилии, имени и номеру телефона
function searchRecords(indexes, query) {
  // Извлекаем индексы из переданного объекта
  const { indexLastName, indexFirstName, indexPhoneNumber } = indexes;

  // Получаем результаты для каждого критерия поиска
  const lastNameResults = indexLastName[query.lastName] || [];
  const firstNameResults = indexFirstName[query.firstName] || [];
  const phoneNumberResults = indexPhoneNumber[query.phoneNumber] || [];

  // Пересекаем результаты, чтобы получить записи, удовлетворяющие всем критериям поиска
  const results = lastNameResults.filter(
    (record) =>
      firstNameResults.includes(record) && phoneNumberResults.includes(record)
  );

  // Возвращаем результаты поиска
  return results;
}
