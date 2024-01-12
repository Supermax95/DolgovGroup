import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { ILaw } from './Laws';
import { VITE_URL } from '../../../VITE_URL';
import axios, { AxiosResponse } from 'axios';
import getLaws from '../../../Redux/thunks/Document/getLaws.api';
import 'quill/dist/quill.snow.css';
import deleteLaw from '../../../Redux/thunks/Document/deleteLaw.api';
import {
  ArrowUturnLeftIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  EyeIcon,
  HandThumbUpIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';
import ReactQuill from 'react-quill';
import deleteDocumentLaw from '../../../Redux/thunks/Document/deleteDocumentLaw.api';
import { unwrapResult } from '@reduxjs/toolkit';
import { Toaster } from 'sonner';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';

interface LawEditorProps {
  isOpen: boolean;
  law: ILaw | null;
  onSaveAdd: (editedLaw: ILaw) => void;
  onSaveEdit: (editedLaw: ILaw) => void;
  onCloseAddEditor: () => void;
  onCloseEditEditor: () => void;
  isAddingMode: boolean;
  editedLaw: ILaw | null | undefined;
  setEditedLaw: React.Dispatch<React.SetStateAction<ILaw | null | undefined>>;
  axiosError: string | null;
  openEditEditor: (law: ILaw) => void;
  resetAxiosError: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setAddingMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLaw: React.Dispatch<React.SetStateAction<ILaw | null>>;
  openAddEditor: () => void;
}

const Editor: FC<LawEditorProps> = ({
  isOpen,
  law,
  onSaveEdit,
  onSaveAdd,
  onCloseAddEditor,
  onCloseEditEditor,
  isAddingMode,
  editedLaw,
  setEditedLaw,
  axiosError,
  resetAxiosError,
  currentStep,
  setCurrentStep,
  setAddingMode,
  setSelectedLaw,
  openEditEditor,
  openAddEditor,
}) => {
  const laws = useAppSelector<ILaw[]>((state) => state.lawsSlice.data);
  const id = useAppSelector((state) => state.lawsSlice.postId);
  const dispatch = useAppDispatch();
  const [isUpload, setUpload] = useState(false);
  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [showNotificationPicture, setShowNotificationPicture] =
    useState<boolean>(false);
  //* удаление
  const [showNotificationDelLaw, setShowNotificationDelLaw] =
    useState<boolean>(false);
  const [showNotificationDelPick, setShowNotificationDelPick] =
    useState<boolean>(false);
  const [showErrorNotificationPicture, setErrorShowNotificationPicture] =
    useState<boolean>(false);

  useEffect(() => {
    if (law) {
      setEditedLaw(law);
    }
  }, [law, setEditedLaw]);


  useEffect(() => {
    if (
      showNotificationPicture ||
      showNotificationDelLaw ||
      showNotificationDelPick ||
      showErrorNotificationPicture
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationPicture(false);
        setShowNotificationDelLaw(false);
        setShowNotificationDelPick(false);
        setErrorShowNotificationPicture(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationPicture,
    showNotificationDelLaw,
    showNotificationDelPick,
    showErrorNotificationPicture,
  ]);

  useEffect(() => {
    if (isAddingMode) {
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
    }
  }, [isAddingMode, setEditedLaw]);

  const handleCancel = () => {
    dispatch(getLaws());
    const law = laws.find((p) => p.id === id);
    setEditedLaw(undefined);
    openEditEditor(law);
    setAddingMode(false);
    resetAxiosError();
  };

  // const uploadFile = async (file: File, id: number | 0): Promise<void> => {
  //   if (file && id) {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       const response: AxiosResponse = await axios.put(
  //         `${VITE_URL}/admin/documentFile/${id}`,
  //         formData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       console.log('======>', showNotificationPicture);
  //       unwrapResult(response);
  //       setShowNotificationPicture(true);
  //         handleCancel();
  //         setTimeout(() => {
  //           handleCancel();
  //         }, 50);
  //     } catch (error) {
  //       console.error('Ошибка при загрузке файла:', error);
  //       const errorRes = 'Ошибка при загрузке файла'
  //       setErrorNotification(errorRes);
  //       setErrorShowNotificationPicture(true);
  //     }
  //   }
  // };
  const uploadFile = async (file: File, id: number | 0): Promise<void> => {
    if (file && id) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response: AxiosResponse = await axios.put(
          `${VITE_URL}/admin/documentFile/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        console.log('======>', showNotificationPicture);
        unwrapResult(response);
        setShowNotificationPicture(true);
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        const errorRes = 'Ошибка при загрузке файла';
        setErrorNotification(errorRes);
        setErrorShowNotificationPicture(true);
      }
    }
  };

  useEffect(() => {
    if (showNotificationPicture) {
      handleCancel();
      setTimeout(() => {
        handleCancel();
      }, 50);
    }
  }, [showNotificationPicture]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );
    if (currentStep === 1) {
      let result = '';
      if (isAddingMode) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result = await onSaveAdd(editedLaw as ILaw);
      } else {
      if (isConfirmed)  {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        result = await onSaveEdit(editedLaw as ILaw);
      }
    }

      if (typeof result !== 'string') {
        setCurrentStep(2);
        setUpload(true);
      }
    } else if (currentStep === 2) {
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await uploadFile(file, id, isAddingMode);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    uploadFile(file, id, isAddingMode);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить документ?');
    if (laws.length > 0) {
      if (isConfirmed && editedLaw && editedLaw.id) {
        const lawId = editedLaw.id;
        const resultAction = await dispatch(deleteLaw(lawId));
        setShowNotificationDelLaw(true);
        if (deleteLaw.fulfilled.match(resultAction)) {
          const response = resultAction.payload;
          setShowNotificationDelLaw(true);
          if (response.length === 0) {
            setEditedLaw(null);
            openAddEditor();
          } else {
            setEditedLaw(response[0]);
          }
        }
      }
    }
  };

  const handleDeleteDocument = () => {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить файл?');
    if (isConfirmed && editedLaw && editedLaw.id) {
      const lawId = editedLaw.id;
      dispatch(deleteDocumentLaw(lawId));
    }   setShowNotificationDelPick(true);
  };

  if (!isOpen || !editedLaw) {
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
  const currentLaw = laws.find((law) => law.id === editedLaw.id);

  return (
    <>
      {/* <div className="mx-auto max-w-screen-lg h-max max-w-2xl w-11/12 md:w-2/3 max-w-2xl"> */}
      <div className="mx-auto max-w-screen-lg h-max w-[974.2px]">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-slate-200">
        <Toaster position="bottom-left" expand={true} />
      {showNotificationPicture && (
        <PopUpNotification
          titleText={'Файл загружен'}
          name={editedLaw.title}
        />
      )}
      {showNotificationDelLaw && (
        <PopUpNotification
          titleText={'Правовой документ удалён'}
          name={editedLaw.title}
        />
      )}

      {showNotificationDelPick && (
        <PopUpNotification
          titleText={'Файл удалён'}
          name={editedLaw.title}
        />
      )}

      {/* //!уведомления об ошибках */}
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
                {isAddingMode ? 'Новый документ' : 'Редактирование документа'}
              </h1>
            </div>
            {currentStep === 1 && (
              <div className="py-8">
                <>
                  <div className="relative">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={editedLaw.title}
                      onChange={(e) =>
                        setEditedLaw({ ...editedLaw, title: e.target.value })
                      }
                      placeholder=""
                      className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                      required={true}
                    />
                    <label
                      htmlFor="title"
                      className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                    >
                      Наименование документа
                    </label>
                  </div>

                  <div className="py-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="relative">
                      <input
                        onChange={(e) =>
                          setEditedLaw({
                            ...editedLaw,
                            dateFrom: e.target.value,
                          })
                        }
                        id="dateFrom"
                        type="date"
                        name="dateFrom"
                        value={editedLaw.dateFrom}
                        placeholder=""
                        className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                        required={true}
                      />
                      <label
                        htmlFor="dateFrom"
                        className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                      >
                        Дата начала действия документа
                      </label>
                    </div>
                    {currentLaw && currentLaw.updatedAt && (
                      <div className="relative">
                        <input
                          id="updatedAt"
                          type="text"
                          name="updatedAt"
                          value={new Date(
                            currentLaw.updatedAt
                          ).toLocaleDateString('ru-RU')}
                          placeholder=""
                          className="block py-2.5 px-0 w-full text-sm text-slate-400 bg-transparent border-0 border-b-2 border-slate-300"
                          required={true}
                          disabled={true}
                        />
                        <label
                          htmlFor="updatedAt"
                          className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                        >
                          Дата последнего обновления
                        </label>
                      </div>
                    )}
                  </div>
                  {currentLaw && currentLaw.documentLink ? (
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-600 text-sm font-normal">
                          Подгружен документ:
                        </span>
                        <button
                          type="button"
                          className="flex items-center justify-center"
                          onClick={() =>
                            window.open(
                              `${VITE_URL}${currentLaw.documentLink}`,
                              '_blank'
                            )
                          }
                        >
                          <div className="flex items-center justify-center">
                            <span className="text-sm text-slate-600 font-normal underline decoration-sky-500 decoration-1">
                              {editedLaw.title}
                            </span>
                            <EyeIcon
                              className="h-5 w-5 ml-2 text-sky-600"
                              aria-hidden="true"
                            />
                          </div>
                        </button>
                      </div>

                      <Button
                        type="button"
                        onClick={handleDeleteDocument}
                        styleCSSButton={
                          'w-full flex items-center justify-center w-1/2 px-5 py-2 mr-2 text-sm transition-colors duration-200 p-0.5 group bg-gradient-to-br from-red-500 to-rose-400 hover:bg-gradient-to-bl from-red-500 to-rose-400 rounded-lg gap-x-2 sm:w-auto'
                        }
                        icon={<TrashIcon className="w-4 h-4 text-slate-50" />}
                        title="Удалить документ"
                      />
                    </div>
                  ) : (
                    <span className="text-slate-600 text-sm font-normal">
                      Подгруженные документы отсутствуют
                    </span>
                  )}

                  <div className="text-center my-4">
                    <label
                      htmlFor="description"
                      className="text-slate-600 text-md font-normal"
                    >
                      Содержание документа
                    </label>
                    <div className="text-center">
                      <span className="text-xs text-orange-500 font-normal">
                        Вы можете внести содержание документа вручную, либо
                        использовать кнопку "Сохранить", чтобы загрузить
                        документ.
                      </span>
                    </div>
                    <div className="mb-2"></div>

                    <div id="editor-container h-[60vh] resize-y overflow-auto">
                      <ReactQuill
                        theme="snow"
                        value={editedLaw.description}
                        onChange={(value) =>
                          setEditedLaw({ ...editedLaw, description: value })
                        }
                        modules={quillModules}
                        className="w-full h-[50vh]"
                      />
                    </div>
                  </div>
                </>
              </div>
            )}

            {currentStep === 1 && (
              <>
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
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="mx-auto mt-2 flex items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-22 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon className="cursor-pointer w-8 h-8 text-slate-500" />
                      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium">Нажмите,</span> чтобы
                        загрузить файл
                      </p>
                      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                        Загрузите документ в формате PDF или DOCX
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                    <div className="text-center my-2">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Если документ загружать не нужно, вы можете пропустить
                        этот шаг
                      </p>{' '}
                    </div>
                  </label>
                </div>
                <div className="flex justify-between mt-2">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    styleCSSButton={
                      'w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-slate-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-slate-800 dark:bg-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:border-slate-700'
                    }
                    styleCSSSpan={'text-sm text-slate-500 dark:text-slate-400'}
                    icon={
                      <ArrowUturnLeftIcon className="w-4 h-4 text-slate-500" />
                    }
                    title="Назад"
                  />
                </div>

                {/* <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-m">
                <div className="px-4 sm:px-0 text-center">
                  <h1 className="text-xl font-bold mb-4">
                    Форма загрузки документа
                    <span className="block mt-2 text-xs text-gray-500">
                      Загрузите документ в формате PDF или DOCX.
                    </span>
                    <span className="block mt-2 text-sm text-gray-500">
                      Если документ загружать не нужно, вы можете пропустить
                      этот шаг
                    </span>
                  </h1>
                  <div className="mt-6">
                    <div className="mb-4">
                      <input
                        type="file"
                        id="fileInput"
                        name="documentLink"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                      <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 inline-block"
                      >
                        Выберите файл
                      </label>
                      <br />
                      <div className="mt-4">
                        <button
                          type="button"
                          className="text-sm text-blue-500 hover:underline focus:outline-none"
                          onClick={handleCancel}
                        >
                          Пропустить
                        </button>
                      </div>
                      <div className="mt-4">
                        <Button
                          type="button"
                          onClick={handleCancel}
                          styleCSSButton={
                            'w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-slate-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-slate-800 dark:bg-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:border-slate-700'
                          }
                          styleCSSSpan={
                            'text-sm text-slate-500 dark:text-slate-400'
                          }
                          icon={
                            <ArrowUturnLeftIcon className="w-4 h-4 text-slate-500" />
                          }
                          title="Назад"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Editor;
