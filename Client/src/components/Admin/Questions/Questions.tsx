import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import Wrapper from '../../../ui/Wrapper';
import EditorQuestion from './EditorQuestion';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import PopUpNotification from '../../../ui/PopUpNotification';
import getQuestions from '../../../Redux/thunks/Question/getQuestions.api';
import newQuestion from '../../../Redux/thunks/Question/newQuestion.api';
import editQuestion from '../../../Redux/thunks/Question/editQuestion.api';
import LoadingAnimation from '../Laws/Loading';
import SidebarQuestion from './SidebarQuestion';

export interface IQuestion {
  id: number;
  title: string;
  description: string;
  updatedAt: Date | string;
}

const Questions: FC = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector<IQuestion[]>(
    (state) => state.questionsSlice.data
  );
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );
  const [isAddingMode, setAddingMode] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<
    IQuestion | null | undefined
  >(null);
  const [axiosError, setAxiosError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showNotificationAddQuestion, setShowNotificationAddQuestion] =
    useState<boolean>(false);
  const [showNotificationEditQuestion, setShowNotificationEditQuestion] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [
    showErrorNotificationAddQuestion,
    setShowErrorNotificationAddQuestion,
  ] = useState<boolean>(false);
  const [
    showErrorNotificationEditQuestion,
    setShowErrorNotificationEditQuestion,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (
      showNotificationAddQuestion ||
      showErrorNotificationAddQuestion ||
      showNotificationEditQuestion ||
      showErrorNotificationEditQuestion
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAddQuestion(false);
        setShowErrorNotificationAddQuestion(false);
        setShowNotificationEditQuestion(false);
        setShowErrorNotificationEditQuestion(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationAddQuestion,
    showErrorNotificationAddQuestion,
    showNotificationEditQuestion,
    showErrorNotificationEditQuestion,
  ]);

  useEffect(() => {
    dispatch(getQuestions())
      .then(() => {
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [dispatch]);

  const openAddEditor = (): void => {
    setAddingMode(true);
    setEditedQuestion({
      id: 0,
      title: '',
      description: '',
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

  const openEditEditor = async (question: IQuestion) => {
    setSelectedQuestion(question);
    setEditedQuestion(question);
    setAddingMode(false);
    setEditorOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (dataLoaded && questions.length === 0) {
      openAddEditor();
    } else if (dataLoaded && questions.length > 0 && !selectedQuestion) {
      openEditEditor(questions[0]);
    }
  }, [dataLoaded, questions, selectedQuestion]);

  const closeAddEditor = (): void => {
    setSelectedQuestion(null);
    setEditedQuestion(null);
    setEditorOpen(false);
    dispatch(getQuestions());
  };

  const closeEditEditor = (): void => {
    setSelectedQuestion(null);
    setEditedQuestion(null);
    setEditorOpen(false);
    dispatch(getQuestions());
  };

  const resetAxiosError = () => {
    setAxiosError(null);
  };

  const handleSaveAdd = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let add = {} as any;

    try {
      if (editedQuestion) {
        const resultAction = await dispatch(
          newQuestion({
            newQuestion: editedQuestion,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setErrorNotification(null);
        setShowNotificationAddQuestion(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAddQuestion(true);
      add = error;
    }
    return add;
  };

  const handleSaveEdit = async (editedQuestion: IQuestion): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let add = {} as any;
    try {
      if (selectedQuestion) {
        const resultAction = await dispatch(
          editQuestion({
            newInfo: editedQuestion,
          })
        );
        const result = unwrapResult(resultAction);
        add = result;
        setShowNotificationEditQuestion(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationEditQuestion(true);
      add = error;
    }
    return add;
  };

  return (
    <Wrapper>
      {showNotificationAddQuestion && (
        <PopUpNotification
          titleText={'Добавлен новый вопрос'}
          name={editedQuestion?.title}
        />
      )}
      {showNotificationEditQuestion && (
        <PopUpNotification
          titleText={'Внесены изменения в вопрос'}
          name={editedQuestion?.title}
        />
      )}
      {/* //!уведомления об ошибках */}
      {showErrorNotificationAddQuestion && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationEditQuestion && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      <SidebarQuestion
        data={questions}
        title="Вопросы"
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
          (selectedQuestion || isAddingMode) && (
            <EditorQuestion
              isOpen={isEditorOpen}
              question={selectedQuestion}
              onSaveEdit={handleSaveEdit}
              onSaveAdd={handleSaveAdd}
              onCloseAddEditor={closeAddEditor}
              onCloseEditEditor={closeEditEditor}
              isAddingMode={isAddingMode}
              editedQuestion={editedQuestion}
              setEditedQuestion={setEditedQuestion}
              axiosError={axiosError}
              resetAxiosError={resetAxiosError}
              openAddEditor={openAddEditor}
              // openEditEditor={openEditEditor}
            />
          )
        )}
      </div>
    </Wrapper>
  );
};

export default Questions;
