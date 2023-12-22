//import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserMenu from './UserMenu';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

interface INavigation {
  id: number;
  name: string;
  href: string;
  isActive: boolean;
}

//! не удалять
// interface INavigation {
//   manager: { id:number, name: string; href: string }[];
//   admin: {id:number, name: string; href: string }[];
// }

const Navbar: FC = () => {
  const location = useLocation(); // хз, как типизировать

  const navigation: INavigation[] = [
    {
      id: 11,
      name: 'Вход',
      href: '/portal',
      isActive: location.pathname === '/portal',
    },
    {
      id: 1,
      name: 'Клиенты',
      href: '/clients',
      isActive: location.pathname === '/clients',
    },
    {
      id: 2,
      name: 'Сотрудники',
      href: '/employees',
      isActive: location.pathname === '/employees',
    },
    {
      id: 3,
      name: 'Магазины',
      href: '/locations',
      isActive: location.pathname === '/locations',
    },
    {
      id: 4,
      name: 'Продукты',
      href: '/products',
      isActive: location.pathname === '/products',
    },
    {
      id: 5,
      name: 'Маркетинговые акции',
      href: '/promotions/carousel',
      isActive: location.pathname === '/promotions/carousel',
    },
    {
      id: 6,
      name: 'Правовая информация',
      href: '/admin/laws',
      isActive: location.pathname === '/admin/laws',
    },
  ];

  //! не удалять
  // const roles: INavigation = {
  // manager: [
  //   { id: 'manager-locations', name: 'Магазины', href: '/locations', isActive: location.pathname === '/locations', },
  //   { id: 'manager-products', name: 'Продукты', href: '/products', isActive: location.pathname === '/products',  },
  //   { id: 'manager-stock', name: 'Акции', href: '/stock',  isActive: location.pathname === '/stock', },
  // ],
  // admin: [
  //   { id: 'admin-clients', name: 'Клиенты', href: '/clients', isActive: location.pathname === '/clients', },
  //   { id: 'admin-employees', name: 'Сотрудники', href: '/employees', isActive: location.pathname === '/employees', },
  //   { id: 'admin-locations', name: 'Магазины', href: '/locations', isActive: location.pathname === '/locations', },
  //   { id: 'admin-products', name: 'Продукты', href: '/products', isActive: location.pathname === '/products',  },
  //   { id: 'admin-stock', name: 'Акции', href: '/stock', isActive: location.pathname === '/stock', },
  // ]
  // };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-slate-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/DGCompany.png"
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
                  key={item.id}
                  to={item.href}
                  className={`block py-2 pl-3 pr-4 rounded hover:text-lime-600 md:hover:bg-transparent md:p-0 md:dark:hover-text-lime-600 dark:text-white dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700 ${
                    item.isActive ? 'text-lime-600' : 'text-slate-500'
                  }`}
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
};

export default Navbar;
