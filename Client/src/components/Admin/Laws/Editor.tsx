import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import { ILaw } from './Laws';
import { VITE_URL } from '../../../VITE_URL';
import axios from 'axios';
import 'quill/dist/quill.snow.css';
import Quill from 'react-quill';
import deleteLaw from '../../../Redux/thunks/Document/deleteLaw.api';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';

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
  resetAxiosError: () => void;
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
}) => {
  const id = useAppSelector((state) => state.lawsSlice.postId);
  const dispatch = useAppDispatch();
  const [isUpload, setUpload] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (law) {
      setEditedLaw({ ...law });
    }
  }, [law, isAddingMode, setEditedLaw]);

  const handleCancel = () => {
    setEditedLaw(undefined);
    resetAxiosError();
    onCloseEditEditor();
    onCloseAddEditor();
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
        await axios.put(`${VITE_URL}/admin/documentFile/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (isAddingMode) {
          onCloseAddEditor();
        } else {
          onCloseEditEditor();
        }
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
    if (editedLaw && editedLaw.id) {
      const lawId = editedLaw.id;
      await dispatch(deleteLaw(lawId));
      onCloseEditEditor();
    }
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

  return (
    <div className="w-[1024px] mx-auto py-8 px-5 bg-white shadow-md rounded-3xl border border-slate-300">
      <form onSubmit={handleFormSubmit}>
        <div className="flex justify-center items-center">
          <div className="w-8 text-gray-600">
            <DocumentTextIcon className="w-6 h-6 text-slate-400" />
          </div>
          <h1 className="text-lime-600 text-lg font-bold tracking-normal leading-tight">
            {isAddingMode ? 'Новый' : 'Редактирование'}
          </h1>
        </div>
        <div className="py-8 text-base leading-6 space-y-4 text-slate-700 sm:text-lg sm:leading-7">
          {currentStep === 1 && (
            <>
              <div className="pt-4 pb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                    Название документа
                  </label>
                </div>

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
              </div>

              <div className="description-container resize-y overflow-auto min-h-50 text-center">
                <label
                  htmlFor="description"
                  className="text-slate-600 text-md font-normal"
                >
                  Содержание документа
                </label>
                <div className="text-center">
                  <span className="text-xs text-orange-500 font-normal">
                    Вы можете внести содержание документа вручную, либо
                    использовать кнопку "Сохранить", чтобы загрузить документ
                    ?файлом в формате...?
                  </span>
                </div>
                <div className="mb-2"></div>

                <Quill
                  theme="snow"
                  value={editedLaw.description}
                  onChange={(value) =>
                    setEditedLaw({ ...editedLaw, description: value })
                  }
                  modules={quillModules}
                  className="w-full"
                />
              </div>

              <div className="mt-4"></div>
              <div className="flex items-center justify-center w-full">
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

                {/* <Button
                  type="submit"
                  styleCSSSpan={
                    'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                  }
                  title="Сохранить"
                /> */}
              </div>
            </>
          )}
        </div>

        {currentStep === 2 && (
          <>
            <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-m">
              <div className="px-4 sm:px-0 text-center">
                <h1 className="text-xl font-bold mb-4">
                  Форма загрузки документа
                </h1>
                <span className="block mt-2 text-sm text-gray-500">
                  Если документ загружать не нужно, вы можете пропустить этот
                  шаг
                </span>
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
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Выберите файл
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Editor;
