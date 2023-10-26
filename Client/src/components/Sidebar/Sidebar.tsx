import React, { useState } from 'react';

interface SidebarProps {
  menuItems: string[];
  onMenuItemClick: (selectedCity: string) => void;
  title: string;

}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onMenuItemClick, title,
     }) => {
  const [selectedCity, setSelectedCity] = useState('Все магазины');
  const [isCityListVisible, setCityListVisible] = useState(false);

  const handleCityChange = (city: string) => {
    if (city === 'all') {
      setSelectedCity('Все магазины');
      setCityListVisible(!isCityListVisible); // Открываем или скрываем список городов при выборе "Все магазины"
      onMenuItemClick(''); // Сбрасываем фильтры
    } else {
      setSelectedCity(city);
      onMenuItemClick(city);
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white h-full border-r">
      <div className="h-16 flex items-center justify-center border-b">
        <div className="text-xl font-bold">{title}</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="py-4 space-y-1">
          <li>
            <button
              className="flex items-center w-full h-12 px-4 text-gray-700 hover-text-indigo-500 focus:outline-none focus-bg-gray-100"
              onClick={() => {
                handleCityChange('all');
              }}
            >
              <span className={`mr-4 ${isCityListVisible ? 'transform rotate-90' : ''} transition-transform`}>▶</span>
              <span className="text-sm">Все магазины</span>
            </button>
          </li>
          {isCityListVisible && (
            menuItems.map((city, index) => (
              <li key={index}>
                <button
                  className={`flex items-center w-full h-12 px-4 text-gray-700 hover-text-indigo-500 focus:outline-none focus-bg-gray-100 ${
                    selectedCity === city ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleCityChange(city)}
                >
                  <span className="mr-4"></span>
                  <span className="text-sm">{city}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
