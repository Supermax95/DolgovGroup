import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { IQuestion } from './Questions';
import {
  DocumentTextIcon,
  HandThumbUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Toaster } from 'sonner';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import getQuestions from '../../../Redux/thunks/Question/getQuestions.api';
import deleteQuestion from '../../../Redux/thunks/Question/deleteQuestion.api';
import { unwrapResult } from '@reduxjs/toolkit';

interface EditorQuestionProps {
  isOpen: boolean;
  question: IQuestion | null;
  onSaveAdd: (editedQuestion: IQuestion) => void;
  onSaveEdit: (editedQuestion: IQuestion) => void;
  onCloseAddEditor: () => void;
  onCloseEditEditor: () => void;
  isAddingMode: boolean;
  editedQuestion: IQuestion | null | undefined;
  setEditedQuestion: React.Dispatch<
    React.SetStateAction<IQuestion | null | undefined>
  >;
  axiosError: string | null;
  resetAxiosError: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setAddingMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLaw: React.Dispatch<React.SetStateAction<IQuestion | null>>;
  openAddEditor: () => void;
  openEditEditor: (question: IQuestion | undefined) => void;
}

const EditorQuestion: FC<EditorQuestionProps> = ({
  isOpen,
  question,
  onSaveEdit,
  onSaveAdd,
  isAddingMode,
  editedQuestion,
  setEditedQuestion,
  resetAxiosError,
  setAddingMode,
  openAddEditor,
  openEditEditor,
}) => {
  const questions = useAppSelector<IQuestion[]>(
    (state) => state.questionsSlice.data
  );
  const dispatch = useAppDispatch();
  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [showNotificationDelQuestion, setShowNotificationDelQuestion] =
    useState<boolean>(false);
  const [showErrorNotificationPicture, setShowErrorNotificationPicture] =
    useState<boolean>(false);

  useEffect(() => {
    if (question) {
      setEditedQuestion(question);
    }
  }, [question, setEditedQuestion]);

  useEffect(() => {
    if (showNotificationDelQuestion || showErrorNotificationPicture) {
      const timeoutId = setTimeout(() => {
        setShowNotificationDelQuestion(false);
        setShowErrorNotificationPicture(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [showNotificationDelQuestion, showErrorNotificationPicture]);

  useEffect(() => {
    if (isAddingMode) {
      setEditedQuestion({
        id: 0,
        title: '',
        description: '',
      });
    }
  }, [isAddingMode, setEditedQuestion]);

  const handleCancel = () => {
    dispatch(getQuestions());
    const question = questions.find((p) => p.id === editedQuestion?.id);
    setEditedQuestion(undefined);
    openEditEditor(question);
    setAddingMode(false);
    resetAxiosError();
  };

  useEffect(() => {
    if (showNotificationDelQuestion) {
      handleCancel();
      setTimeout(() => {
        handleCancel();
      }, 50);
    }
  }, [showNotificationDelQuestion]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );

    if (isConfirmed) {
      try {
        let result = '';
        if (isAddingMode) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result = await onSaveAdd(editedQuestion as IQuestion);
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result = await onSaveEdit(editedQuestion as IQuestion);
        }
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
        setErrorNotification(error as string | null);
        setShowErrorNotificationPicture(true);
      }
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить вопрос?'
    );

    if (isConfirmed && editedQuestion && editedQuestion.id) {
      const questionId = editedQuestion.id;
      try {
        const resultAction = await dispatch(deleteQuestion(questionId));
        setShowNotificationDelQuestion(true);

        if (deleteQuestion.fulfilled.match(resultAction)) {
          const response = resultAction.payload;
          if (response.length === 0) {
            setEditedQuestion(null);
            openAddEditor();
          } else {
            setEditedQuestion(response[0]);
          }
        }
      } catch (error) {
        console.error('Ошибка при удалении вопроса:', error);
        setErrorNotification(error as string | null);
        setShowErrorNotificationPicture(true);
      }
    }
  };


  if (!isOpen || !editedQuestion) {
    return null;
  }

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  return (
    <>
      <div className="mx-auto max-w-screen-lg h-max w-[974.2px]">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-slate-200">
          <Toaster position="bottom-left" expand={true} />
          {showNotificationDelQuestion && (
            <PopUpNotification
              titleText={'Вопрос удалён'}
              name={editedQuestion?.title}
            />
          )}

          {showErrorNotificationPicture && (
            <PopUpErrorNotification
              titleText={'Ошибка'}
              bodyText={errorNotification}
            />
          )}

          <form onSubmit={handleFormSubmit}>
            <div className="flex justify-center items-center">
              <div className="w-8 text-gray-600">
                <DocumentTextIcon className="w-6 h-6 text-slate-400" />
              </div>
              <h1 className="text-lime-600 text-lg font-bold tracking-normal leading-tight">
                {isAddingMode ? 'Новый вопрос' : 'Редактирование вопроса'}
              </h1>
            </div>

            <div className="py-8">
              <>
                <div className="relative">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={editedQuestion?.title}
                    onChange={(e) =>
                      setEditedQuestion({
                        ...editedQuestion,
                        title: e.target.value,
                      })
                    }
                    placeholder=""
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                    required={true}
                  />
                  <label
                    htmlFor="title"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                  >
                    Наименование вопроса
                  </label>
                </div>

                <div className="py-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="text-center my-4">
                    <label
                      htmlFor="description"
                      className="text-slate-600 text-md font-normal"
                    >
                      Содержание вопроса
                    </label>
                    <div className="text-center">
                      <span className="text-xs text-orange-500 font-normal">
                        Вы можете внести содержание вопроса вручную или
                        использовать кнопку "Сохранить", чтобы загрузить
                        содержание.
                      </span>
                    </div>
                    <div className="mb-2"></div>

                    <div id="editor-container h-[60vh] resize-y overflow-auto">
                      <ReactQuill
                        theme="snow"
                        value={editedQuestion?.description}
                        onChange={(value) =>
                          setEditedQuestion({
                            ...editedQuestion,
                            description: value,
                          })
                        }
                        modules={quillModules}
                        className="w-full h-[50vh]"
                      />
                    </div>
                  </div>
                </div>
              </>

              <div className="mt-8"></div>
              <div className="flex items-center justify-center w-full">
                <Button
                  type="submit"
                  icon={<HandThumbUpIcon className="w-4 h-4 text-slate-50" />}
                  title="Сохранить"
                />

                {!isAddingMode && (
                  <Button
                    type="button"
                    onClick={handleDelete}
                    styleCSSButton={
                      'w-full flex items-center justify-center w-1/2 px-5 py-2 mr-2 text-sm transition-colors duration-200 p-0.5 group bg-gradient-to-br from-red-500 to-rose-400 hover:bg-gradient-to-bl from-red-500 to-rose-400 rounded-lg gap-x-2 sm:w-auto'
                    }
                    icon={<TrashIcon className="w-4 h-4 text-slate-50" />}
                    title="Удалить"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditorQuestion;
