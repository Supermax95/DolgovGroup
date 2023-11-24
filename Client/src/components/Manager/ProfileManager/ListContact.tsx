import { FC } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Table from '../../../ui/Table';
import { useAppSelector } from '../../../Redux/hooks';
import SidebarProfile from '../../../ui/SidebarProfile';
import { ListBulletIcon, UserIcon } from '@heroicons/react/24/outline';

interface IManager {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
}

interface IColumnsDefaultName {
  name: string;
}

type IColumnsListDb =
  | 'id'
  | 'lastName'
  | 'firstName'
  | 'middleName'
  | 'phone'
  | 'email'
  | 'isAdmin';

const ListContact: FC = () => {
  const managerProfile = useAppSelector<{
    lastName?: string;
    firstName?: string;
    middleName?: string;
    phone: string;
    email?: string;
    password?: string;
  }>((state) => state.managerSlice.manager);

  const currentManagerId = useAppSelector<number>(
    (state) => state.managerSlice.manager.id
  );
  console.log('currentManagerId', currentManagerId);

  const managers = useAppSelector<IManager[]>(
    (state) => state.managerSlice.info
  );
  console.log('managers info', managers);

  const columnsDefaultName: IColumnsDefaultName[] = [
    { name: 'Фамилия' },
    { name: 'Имя' },
    { name: 'Отчество' },
    { name: 'Телефон' },
    { name: 'Email' },
    { name: 'Должность' },
  ];

  const columnsListDb: IColumnsListDb[] = [
    'id',
    'lastName',
    'firstName',
    'middleName',
    'phone',
    'email',
    'isAdmin',
  ];

  const displayedManagers = managers;

  const sidebarProfileManager = [
    {
      id: 1,
      href: '/listOfManagersForManager',
      name: 'Список контактов',
      childrenIcon: <ListBulletIcon className="w-6 h-6 text-slate-600" />,
    },
    {
      id: 2,
      href: '/profileManager',
      name: 'Персональные данные',
      childrenIcon: <UserIcon className="w-6 h-6 text-slate-600" />,
    },
  ];

  return (
    <Wrapper>
      <SidebarProfile
        avatar={
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-b from-orange-300 to-orange-400 rounded-full dark:bg-gray-600">
            <span className="font-normal text-2xl text-white">M</span>
          </div>
        }
        firstName={managerProfile.firstName}
        lastName={managerProfile.lastName}
        sidebarProfile={sidebarProfileManager}
      />
      <div className="p-4">
        <Table
          title="Список контактов"
          data={displayedManagers}
          columnsDefaultName={columnsDefaultName}
          columnsListDb={columnsListDb}
          currentManagerId={currentManagerId}
        />
      </div>
    </Wrapper>
  );
};

export default ListContact;
