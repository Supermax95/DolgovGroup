import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import Table from '../../../ui/Table';
import getLaws from '../../../Redux/thunks/Document/getLaws.api';
import editLaw from '../../../Redux/thunks/Document/editLaw.api';
import { unwrapResult } from '@reduxjs/toolkit';
import addLaw from '../../../Redux/thunks/Document/addLaw.api';
import Editor from './Editor';

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
  const [isEditorOpen, setEditorOpen] = useState(false);
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

  const openAddEditor = (): void => {
    setAddingMode(true);
    setEditedLaw({
      id: 0,
      title: '',
      description: '',
      dateFrom: '',
      updatedAt: new Date(),
    });
    setEditorOpen(true);
  };

  const openEditEditor = (law: ILaw): void => {
    setSelectedLaw(law);
    setEditedLaw({ ...law });
    setAddingMode(false);
    setEditorOpen(true);
    dispatch(getLaws());
  };

  const closeAddEditor = (): void => {
    setSelectedLaw(null);
    setEditedLaw(null);
    setEditorOpen(false);
    dispatch(getLaws());
  };

  const closeEditEditor = (): void => {
    setSelectedLaw(null);
    setEditedLaw(null);
    setEditorOpen(false);
  };


  const resetAxiosError = () => {
    setAxiosError(null);
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

  return (
    <Wrapper>
      <div className="p-4">
        <Table
          title="Правовые документы"
          columnsDefaultName={columnsDefaultName}
          itemsPerPage={itemsPerPage}
          columnsListDb={columnsListDb}
          onAddClick={openAddEditor}
          onEditClick={openEditEditor}
          data={laws}
        />
      </div>
      {isEditorOpen && (selectedLaw || isAddingMode) && (
        <Editor
          isOpen={isEditorOpen}
          law={selectedLaw}
          onSaveEdit={handleSaveEdit}
          onSaveAdd={handleSaveAdd}
          onCloseAddEditor={closeAddEditor}
          onCloseEditEditor={closeEditEditor}
          isAddingMode={isAddingMode}
          editedLaw={editedLaw}
          setEditedLaw={setEditedLaw}
          axiosError={axiosError}
          resetAxiosError={resetAxiosError}
        />
      )}
    </Wrapper>
  );
};

export default Law;
