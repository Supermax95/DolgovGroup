import { FC } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Table from '../../../ui/Table';
import { useAppSelector } from '../../../Redux/hooks';
import RoleSidebar from '../../RoleSidebar/RoleSidebar';

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

  return (
    <Wrapper>
      <RoleSidebar />

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
