import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const menuClass = isMenuOpen ? 'block' : 'hidden';

  const navigation = [
    { name: 'Личный кабинет М ', href: '/profileManager' },
    { name: 'Личный кабинет А', href: '/profileAdmin' },
    { name: 'Выход', href: '/portal/logout' },
  ];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="user photo"
          />
        </button>
      </div>
      <div
        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white divide-y divide-gray-100 ${menuClass}`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
            name@flowbite.com
          </span>
        </div>
        <ul
          className="py-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <li>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
