import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import getLaws from '../../../Redux/thunks/Document/getLaws.api';
import editLaw from '../../../Redux/thunks/Document/editLaw.api';
import { unwrapResult } from '@reduxjs/toolkit';
import addLaw from '../../../Redux/thunks/Document/addLaw.api';
import currentLaw from '../../../Redux/thunks/Document/getcurrentLaw.api';
import Editor from './Editor';
import SidebarLaw from '../../../ui/SidebarLaw';
import LoadingAnimation from './Loading';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import PopUpNotification from '../../../ui/PopUpNotification';

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
  const [isLoading, setLoading] = useState(false);
  const [showNotificationAddLaw, setShowNotificationAddLaw] =
    useState<boolean>(false);
  const [showNotificationEditLaw, setShowNotificationEditLaw] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [showErrorNotificationAddLaw, setShowErrorNotificationAddLaw] =
    useState<boolean>(false);
  const [showErrorNotificationEditLaw, setShowErrorNotificationEditLaw] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      showNotificationAddLaw ||
      showErrorNotificationAddLaw ||
      showNotificationEditLaw ||
      showErrorNotificationEditLaw
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAddLaw(false);
        setShowErrorNotificationAddLaw(false);
        setShowNotificationEditLaw(false);
        setShowErrorNotificationEditLaw(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationAddLaw,
    showErrorNotificationAddLaw,
    showNotificationEditLaw,
    showErrorNotificationEditLaw,
  ]);

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const openEditEditor = async (law: ILaw) => {
    const lawId = law.id;
    const res = await dispatch(currentLaw(lawId));
    const result = unwrapResult(res);
    setCurrentStep(1);
    setSelectedLaw(result);
    setEditedLaw(result);
    setAddingMode(false);
    setEditorOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (dataLoaded && laws.length === 0) {
      openAddEditor();
    } else if (dataLoaded && laws.length > 0 && !selectedLaw) {
      openEditEditor(laws[0]);
    }
  }, [dataLoaded, laws, selectedLaw]);

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
        setErrorNotification(null);
        setShowNotificationAddLaw(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddLaw(true);
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
        setShowNotificationEditLaw(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationEditLaw(true);
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

  //   return (
  //     <Wrapper>
  //       <SidebarLaw
  //         data={formattedLaws}
  //         title="Документы"
  //         onAddClick={openAddEditor}
  //         onEditClick={openEditEditor}
  //       />
  //       <div className={`p-4 ${isLoading ? 'blur' : ''}`}>
  //         {isLoading || isEditorOpen ? (
  //           <Editor
  //             isOpen={isEditorOpen}
  //             law={selectedLaw}
  //             onSaveEdit={handleSaveEdit}
  //             onSaveAdd={handleSaveAdd}
  //             onCloseAddEditor={closeAddEditor}
  //             onCloseEditEditor={closeEditEditor}
  //             isAddingMode={isAddingMode}
  //             editedLaw={editedLaw}
  //             setEditedLaw={setEditedLaw}
  //             axiosError={axiosError}
  //             resetAxiosError={resetAxiosError}
  //             currentStep={currentStep}
  //             setCurrentStep={setCurrentStep}
  //             setAddingMode={setAddingMode}
  //             setSelectedLaw={setSelectedLaw}
  //             openAddEditor={openAddEditor}
  //             openEditEditor={openEditEditor}
  //           />
  //         ) : null}
  //       </div>
  //     </Wrapper>
  //   );
  // };
  // export default Law;

  return (
    <Wrapper>
      {showNotificationAddLaw && (
        <PopUpNotification
          titleText={'Добавлен новый правовой документ'}
          name={editedLaw?.title}
        />
      )}
      {showNotificationEditLaw && (
        <PopUpNotification
          titleText={'Внесены изменения в документ'}
          name={editedLaw?.title}
        />
      )}
      {/* //!уведомления об ошибках */}
      {showErrorNotificationAddLaw && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationEditLaw && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      <SidebarLaw
        data={formattedLaws}
        title="Документы"
        onAddClick={openAddEditor}
        onEditClick={openEditEditor}
      />
      <div
        className={`p-4 ${
          isLoading
            ? 'max-w-screen-lg mx-auto mt-8 p-8 bg-white rounded-xl w-[1020px] h-[500px] backdrop-blur-lg'
            : ''
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingAnimation />
          </div>
        ) : (
          isEditorOpen &&
          (selectedLaw || isAddingMode) && (
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
              openEditEditor={openEditEditor}
            />
          )
        )}
      </div>
    </Wrapper>
  );
};

export default Law;
