import { FC, useEffect, useState } from 'react';
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

  const managers = useAppSelector<IManager[]>(
    (state) => state.managerSlice.info
  );

  const [isLoading, setLoading] = useState(false);

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
    const fetchData = async () => {
      try {
        await dispatch(getManagerInfo());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const displayedManagers = managers;

  return (
    <Wrapper>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="relative h-16 w-16">
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-4 border-gray-300 rounded-full animate-spin"></div>
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-t-4 border-green-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </Wrapper>
  );
};

export default ListContact;
