import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
// import LawsModal from './LawsModal';
import Wrapper from '../../../ui/Wrapper';
import Table from '../../../ui/Table';
import getLaws from '../../../Redux/thunks/Document/getLaws.api';
import editLaw from '../../../Redux/thunks/Document/editLaw.api';
import { unwrapResult } from '@reduxjs/toolkit';
import addLaw from '../../../Redux/thunks/Document/addLaw.api';

export interface ILaw {
  id: number;
  title: string;
  description: string;
  dateFrom: string;
  updatedAt: Date;
}

interface IColumnsDefaultName {
  name: string;
}

type IColumnsListDb = 'id' | 'title' | 'dateFrom' | 'updatedAt';

const Law: FC = () => {
  const dispatch = useAppDispatch();
  const laws = useAppSelector<ILaw[]>((state) => state.lawsSlice.data);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLaw, setSelectedLaw] = useState<ILaw | null>(null);
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedLaw, setEditedLaw] = useState<ILaw | null | undefined>(null);
  const [axiosError, setAxiosError] = useState<string | null>(null);

  const columnsDefaultName: IColumnsDefaultName[] = [
    { name: 'Название документа' },
    { name: 'От какого числа' },
    { name: 'Последнее обновление' },
  ];

  const columnsListDb: IColumnsListDb[] = [
    'id',
    'title',
    'dateFrom',
    'updatedAt',
  ];

  useEffect(() => {
    dispatch(getLaws());
  }, [dispatch]);

  const itemsPerPage = 10;

  const openAddModal = (): void => {
    setAddingMode(true);
    setEditedLaw({
      id: 0,
      title: '',
      description: '',
      dateFrom: '',
      updatedAt: new Date(),
    });
    setModalOpen(true);
  };

  const openEditModal = (law: ILaw): void => {
    setSelectedLaw(law);
    setEditedLaw({ ...law });
    setAddingMode(false);
    setModalOpen(true);
    dispatch(getLaws());
  };

  const closeAddModal = (): void => {
    setSelectedLaw(null);
    setEditedLaw(null);
    setModalOpen(false);
    dispatch(getLaws());
  };

  const closeEditModal = (): void => {
    setSelectedLaw(null);
    setEditedLaw(null);
    setModalOpen(false);
  };

  const handleSaveAdd = async (): Promise<void> => {
    let add = {} as any;
    try {
      if (editedLaw) {
        const resultAction = await dispatch(
          addLaw({
            newLaw: editedLaw,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setAxiosError(null);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setAxiosError(error as string | null);
      add = error;
    }
    return add;
  };

  const handleSaveEdit = async (editedLaw: ILaw): Promise<void> => {
    let add = {} as any;
    try {
      if (selectedLaw) {
        const resultAction = await dispatch(
          editLaw({
            newInfo: editedLaw,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setAxiosError(null);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setAxiosError(error as string | null);
      add = error;
    }
    return add;
  };

  // const reverseDate = (dateString: string): string => {
  //   const [year, month, day] = dateString.split('-');
  //   return `${day}.${month}.${year}`;
  // };

  return (
    <Wrapper>
      <div className="p-4">
        <Table
          title="Правовые документы"
          columnsDefaultName={columnsDefaultName}
          itemsPerPage={itemsPerPage}
          columnsListDb={columnsListDb}
          onAddClick={openAddModal}
          onEditClick={openEditModal}
          data={laws}
        />
      </div>
    </Wrapper>
  );
};

export default Law;
