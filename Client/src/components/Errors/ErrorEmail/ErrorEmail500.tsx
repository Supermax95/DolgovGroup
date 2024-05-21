import React from 'react';

const ErrorEmail500: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white max-w-md p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Произошла ошибка</h2>
        <p className="text-gray-700 mb-4">
          Возможно, вы использовали устаревшую ссылку. Пожалуйста, перейдите по
          последней ссылке. Если ошибка повторяется или вы не можете изменить
          email, обратитесь в поддержку.
        </p>
        <div className="flex justify-end"></div>
      </div>
    </div>
  );
};

export default ErrorEmail500;
