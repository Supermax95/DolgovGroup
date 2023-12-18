import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white max-w-md p-8 rounded shadow-md">
        <img
          src="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663618522_9-mykaleidoscope-ru-p-veselaya-svinka-krasivo-9.jpg"
          alt="Sad Pig"
          className="mb-8 max-w-full"
        />
        <h1 className="text-4xl font-bold mb-2">404 - Страница не найдена</h1>
        <p className="text-gray-700 text-center">
          Извините, запрашиваемая страница не существует.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
