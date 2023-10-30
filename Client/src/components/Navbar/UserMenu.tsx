import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { IManager } from '../../Redux/manager.slice';
import portalLogout from '../../Redux/thunks/PortalLogin/portalLogout.api';

interface INavigation {
  manager: { id: string; name: string; href: string }[];
  admin: { id: string; name: string; href: string }[];
}

const UserMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const manager = useAppSelector<IManager>(
    (state) => state.managerSlice.manager
  );


  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const menuClass = isMenuOpen ? 'block' : 'hidden';

  const roles: INavigation = {
    manager: [
      {
        id: 'profile-manager',
        name: 'Личный кабинет',
        href: '/profileManager',
      },
    ],
    admin: [
      { id: 'profile-admin', name: 'Личный кабинет', href: '/profileAdmin' },
    ],
  };

  const userRoles = manager.isAdmin ? roles.admin : roles.manager;

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(portalLogout());
      navigate('/portal');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="flex text-sm bg-lime-100 rounded-full focus:ring-2 focus:ring-lime-600/50 dark:focus:ring-lime-600/50"
        >
          <span className="sr-only">Open user menu</span>
          {manager.isAdmin ? (
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full dark:bg-gray-600">
              <span className="font-normal text-2xl text-white">A</span>
            </div>
          ) : (
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-b from-orange-300 to-orange-400 rounded-full dark:bg-gray-600">
              <span className="font-normal text-2xl text-white">M</span>
            </div>
          )}
        </button>
      </div>
      <div
        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white divide-y divide-gray-100 ${menuClass}`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-slate-600 dark:text-white">
            {manager.firstName} {manager.lastName}
          </span>
          <span className="block text-sm text-slate-500 truncate dark:text-gray-400">
            {manager.email}
          </span>
        </div>
        <ul
          className="py-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <li>
            {userRoles.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                role="menuitem"
                onClick={item.name === 'Выход' ? handleLogout : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div
              className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={handleLogout}
            >
              Выход
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
