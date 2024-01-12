import { FC } from 'react';
import {
  IdentificationIcon,
  ListBulletIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import SidebarProfile from '../../ui/SidebarProfile';
import { useAppSelector } from '../../Redux/hooks';

const RoleSidebar: FC = () => {
  const managerProfile = useAppSelector<{
    lastName?: string;
    firstName?: string;
    middleName?: string;
    phone?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
  }>((state) => state.managerSlice.manager);

  //console.log('managerProfile', managerProfile);

  const roleSidebar = {
    admin: {
      avatar: (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full dark:bg-gray-600">
          <span className="font-normal text-2xl text-white">A</span>
        </div>
      ),
      personalData: {
        firstName: managerProfile.firstName,
        lastName: managerProfile.lastName,
      },
      links: [
        {
          id: 1,
          href: '/profileAdmin',
          name: 'Персональные данные',
          childrenIcon: (
            <IdentificationIcon className="w-4 h-4 text-slate-600" />
          ),
        },
        {
          id: 2,
          href: '/listOfManagers',
          name: 'Список менеджеров',
          childrenIcon: <ListBulletIcon className="w-4 h-4 text-slate-600" />,
        },
      ],
    },

    manager: {
      avatar: (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-b from-orange-300 to-orange-400 rounded-full dark:bg-gray-600">
          <span className="font-normal text-2xl text-white">M</span>
        </div>
      ),
      personalData: {
        firstName: managerProfile.firstName,
        lastName: managerProfile.lastName,
      },
      links: [
        {
          id: 1,
          href: '/profileManager',
          name: 'Персональные данные',
          childrenIcon: <UserIcon className="w-4 h-4 text-slate-600" />,
        },
        {
          id: 2,
          href: '/listOfManagersForManager',
          name: 'Список контактов',
          childrenIcon: <ListBulletIcon className="w-4 h-4 text-slate-600" />,
        },
      ],
    },
  };

  const userRoles = managerProfile.isAdmin
    ? roleSidebar.admin
    : roleSidebar.manager;

  return <SidebarProfile userRoles={userRoles} />;
};

export default RoleSidebar;
