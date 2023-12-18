import React from 'react';

const Success: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white max-w-md p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Аккаунт активирован!</h2>
        <p className="text-gray-700 mb-4">Теперь вы можете вернуться в приложение.</p>
        <div className="flex justify-end">
            
          {/* Дополнительные элементы или ссылка для возврата в приложение могут быть добавлены здесь */}
        </div>
      </div>
    </div>
  );
};

export default Success;
