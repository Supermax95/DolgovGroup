//import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserMenu from './UserMenu';

interface INavigation {
  name: string;
  href: string;
}

//! не удалять
// interface INavigation {
//   manager: { name: string; href: string }[];
//   admin: { name: string; href: string }[];
// }

function Navbar() {
  const navigation: INavigation[] = [
    { name: 'Вход', href: '/portal' },
    { name: 'Клиенты', href: '/clients' },
    { name: 'Сотрудники', href: '/employees' },
    { name: 'Продукты', href: '/products' },
    { name: 'Магазины', href: '/locations' },
    { name: 'Акции', href: '/stock' },
  ];

  //! не удалять
  // const roles: INavigation = {
  //   manager: [
  // { name: 'Продукты', href: '/products' },
  // { name: 'Магазины', href: '/locations' },
  // { name: 'Акции', href: '/stock' },
  //   ],
  //   admin: [
  // { name: 'Клиенты', href: '/clients' },
  // { name: 'Сотрудники', href: '/employees' },
  // { name: 'Продукты', href: '/products' },
  // { name: 'Магазины', href: '/locations' },
  // { name: 'Акции', href: '/stock' },
  //   ],
  // };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img
              src="./src/assets/DGCompany.png"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DGCompany
            </span> */}
          </Link>

          <div className="flex md:order-2">
            <UserMenu />

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover-bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;