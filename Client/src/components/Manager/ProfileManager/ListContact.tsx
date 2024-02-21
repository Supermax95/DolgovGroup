import { FC, useEffect } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Table from '../../../ui/Table';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import RoleSidebar from '../../RoleSidebar/RoleSidebar';
import getManagerInfo from '../../../Redux/thunks/Manager/getManagerInfo.api';

export interface IManager {
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
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(getManagerInfo());
  }, [dispatch]);

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
