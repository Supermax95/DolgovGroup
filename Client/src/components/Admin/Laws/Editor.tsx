import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { ILaw } from './Laws';
import { VITE_URL } from '../../../VITE_URL';
import axios, { AxiosResponse } from 'axios';
import getLaws from '../../../Redux/thunks/Document/getLaws.api';
import 'quill/dist/quill.snow.css';
import deleteLaw from '../../../Redux/thunks/Document/deleteLaw.api';
import { DocumentTextIcon, EyeIcon } from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';
import ReactQuill from 'react-quill';

interface LawEditorProps {
  isOpen: boolean;
  law: ILaw | null;
  onSaveAdd: (editedLaw: ILaw) => void;
  onSaveEdit: (editedLaw: ILaw) => void;
  onCloseAddEditor: () => void;
  onCloseEditEditor: () => void;
  // openAddEditor: () => void;
  isAddingMode: boolean;
  editedLaw: ILaw | null | undefined;
  setEditedLaw: React.Dispatch<React.SetStateAction<ILaw | null | undefined>>;
  axiosError: string | null;
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
  openAddEditor,
}) => {
  const laws = useAppSelector<ILaw[]>((state) => state.lawsSlice.data);
  const id = useAppSelector((state) => state.lawsSlice.postId);
  const dispatch = useAppDispatch();
  const [isUpload, setUpload] = useState(false);

  useEffect(() => {
    if (law) {
      setEditedLaw({ ...law });
    }
  }, [law, isAddingMode, setEditedLaw]);

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
  }, [isAddingMode]);

  const handleCancel = () => {
    dispatch(getLaws());
    const sortedLaws = [...laws].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    const newestLaw = sortedLaws[0];
    setSelectedLaw(newestLaw);
    setEditedLaw(newestLaw);

    setAddingMode(false);
    resetAxiosError();
    setCurrentStep(1);
  };

  const uploadFile = async (
    file: File,
    id: number | 0,
    isAddingMode: boolean
  ): Promise<void> => {
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
        handleCancel();
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      let result = '';
      if (isAddingMode) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result = await onSaveAdd(editedLaw as ILaw);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result = await onSaveEdit(editedLaw as ILaw);
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
    if (laws.length > 0) {
      if (editedLaw && editedLaw.id) {
        const lawId = editedLaw.id;
        const resultAction = await dispatch(deleteLaw(lawId));
        if (deleteLaw.fulfilled.match(resultAction)) {
          const response = resultAction.payload;

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

  // const handleDelete = async () => {
  //   if (editedLaw && editedLaw.id) {
  //     const lawId = editedLaw.id;
  //     await dispatch(deleteLaw(lawId));
  //     if (laws.length > 0) {
  //       setEditedLaw(laws[0]);
  //     }
  //     if (laws.length > 0) {
  //       setEditedLaw(laws[0]);
  //     } else {
  //       onCloseEditEditor();
  //       openAddEditor();
  //     }
  //   }
  // };

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
      <div className="max-w-screen-lg h-max py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-slate-300">
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-center items-center">
            <div className="w-8 text-gray-600">
              <DocumentTextIcon className="w-6 h-6 text-slate-400" />
            </div>
            <h1 className="text-lime-600 text-lg font-bold tracking-normal leading-tight">
              {isAddingMode ? 'Новый документ' : 'Редактирование документа'}
            </h1>
          </div>
          <div className="py-8 text-base leading-6 space-y-4 text-slate-700 sm:text-lg sm:leading-7">
            {currentStep === 1 && (
              <>
                <div className="relative">
                  <input
                    onChange={(e) =>
                      setEditedLaw({ ...editedLaw, title: e.target.value })
                    }
                    id="title"
                    name="title"
                    type="text"
                    value={editedLaw.title}
                    placeholder=""
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                    required={true}
                  />
                  <label
                    htmlFor="title"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                  >
                    Наименование документа
                  </label>
                </div>
                <div className="pt-4 pb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                      className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                    >
                      Дата начала действия документа
                    </label>
                  </div>
                  {currentLaw && currentLaw.updatedAt && (
                    <div className="relative">
                      <input
                        onChange={(e) =>
                          setEditedLaw({
                            ...editedLaw,
                            updatedAt: e.target.value,
                          })
                        }
                        id="updatedAt"
                        type="text"
                        name="updatedAt"
                        value={new Date(
                          currentLaw.updatedAt
                        ).toLocaleDateString('ru-RU')}
                        placeholder=""
                        className="block py-2.5 px-0 w-full text-sm text-slate-400 bg-transparent border-0 border-b-2 border-slate-300 "
                        required={true}
                        disabled={true}
                      />
                      <label
                        htmlFor="updatedAt"
                        className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                      >
                        Дата последнего обновления
                      </label>
                    </div>
                  )}
                </div>
                {currentLaw && currentLaw.documentLink ? (
                  <div>
                    <button
                      type="button"
                      className="flex items-center "
                      onClick={() =>
                        window.open(
                          `${VITE_URL}${currentLaw.documentLink}`,
                          '_blank'
                        )
                      }
                    >
                      Документ
                      <EyeIcon
                        className="h-5 w-5 ml-2 text-[#76a1dd] cursor-pointer"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-300">
                    Подгруженных документов: нет
                  </div>
                )}
                <div className="text-center">
                  <label
                    htmlFor="description"
                    className="text-slate-600 text-md font-normal"
                  >
                    Содержание документа
                  </label>
                  <div className="text-center">
                    <span className="text-xs text-orange-500 font-normal">
                      Вы можете внести содержание документа вручную, либо
                      использовать кнопку "Сохранить", чтобы загрузить документ.
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
            )}
          </div>
          {currentStep === 1 && (
            <>
              <div className="mt-8"></div>
              <div className="flex items-center justify-center w-full">
                <Button
                  type="submit"
                  styleCSSSpan={
                    'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                  }
                  title="Сохранить"
                />

                {!isAddingMode && (
                  <Button
                    type="button"
                    onClick={handleDelete}
                    styleCSSButton={
                      'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-slate-700  rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white'
                    }
                    styleCSSSpan={
                      'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                    }
                    title="Удалить"
                  />
                )}
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-m">
                <div className="px-4 sm:px-0 text-center">
                  <h1 className="text-xl font-bold mb-4">
                    Форма загрузки документа
                  <span className="block mt-2 text-xs text-gray-500">
                  Загрузите документ в формате PDF или DOCX.
                  </span>
                  <span className="block mt-2 text-sm text-gray-500">
                    Если документ загружать не нужно, вы можете пропустить этот
                    шаг
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Editor;
