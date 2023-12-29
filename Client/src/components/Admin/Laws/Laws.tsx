import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import getLaws from '../../../Redux/thunks/Document/getLaws.api';
import editLaw from '../../../Redux/thunks/Document/editLaw.api';
import { unwrapResult } from '@reduxjs/toolkit';
import addLaw from '../../../Redux/thunks/Document/addLaw.api';
import Editor from './Editor';
import SidebarLaw from '../../../ui/SidebarLaw';

export interface ILaw {
  id: number;
  title: string;
  description: string;
  documentLink: string;
  dateFrom: string;
  updatedAt: Date | string;
}

const Law: FC = () => {
  const dispatch = useAppDispatch();
  const laws = useAppSelector<ILaw[]>((state) => state.lawsSlice.data);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [selectedLaw, setSelectedLaw] = useState<ILaw | null>(null);
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedLaw, setEditedLaw] = useState<ILaw | null | undefined>(null);
  const [axiosError, setAxiosError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    dispatch(getLaws())
      .then(() => {
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching laws:', error);
      });
  }, [dispatch]);


  
  const openAddEditor = (): void => {
    setCurrentStep(1);
    setAddingMode(true);
    console.log('openAddEditor');
    setEditedLaw({
      id: 0,
      title: '',
      description: '',
      documentLink: '',
      dateFrom: '',
      updatedAt: new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    });
    setEditorOpen(true);
  };

 

  const openEditEditor = (law: ILaw): void => {
    console.log('openEditEditor', law);
    setCurrentStep(1);
    setSelectedLaw(law);
    setEditedLaw(law);
    setAddingMode(false);
    setEditorOpen(true);
    dispatch(getLaws());
  };


  useEffect(() => {
    if (dataLoaded && laws.length === 0) {
      openAddEditor();
    } else if (dataLoaded && laws.length > 0 && !selectedLaw) {
      openEditEditor(laws[0]);
    }
  }, [dataLoaded, laws, selectedLaw]);
  
  // const openEditEditor = (law: ILaw): void => {
  //   setCurrentStep(1);
  //   setAddingMode(false);
  //   setEditorOpen(true);
  //   setSelectedLaw({ ...law });
  //   dispatch(getLaws());
  // };

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

  const formattedLaws = laws.map((law) => ({
    ...law,
    updatedAt: new Date(law.updatedAt).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));

  return (
    <Wrapper>
      <SidebarLaw
        data={formattedLaws}
        title="Документы"
        onAddClick={openAddEditor}
        onEditClick={openEditEditor}
      />

      <div className="p-4">
        {/* <h1 className="text-xl text-lime-600 font-medium mb-4 text-center">
          Правовая информация
        </h1> */}
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
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            setAddingMode={setAddingMode}
            setSelectedLaw={setSelectedLaw}
            openAddEditor={openAddEditor}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Law;
