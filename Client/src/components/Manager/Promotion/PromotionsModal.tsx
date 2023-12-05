import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import { IPromotion } from './Promotions';
import { VITE_URL } from '../../../VITE_URL';
import axios from 'axios';
import deletePromotion from '../../../Redux/thunks/Promotion/deletePromotion.api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Promotion {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  discount: number;
  description: string;
}

interface PromotionsModalProps {
  isOpen: boolean;
  promotion: Promotion | null;
  onSaveEdit: (editedPromotion: IPromotion) => void;
  onSaveAdd: (editedPromotion: IPromotion) => void;
  onCloseEditModal: () => void;
  onCloseAddModal: () => void;
  isAddingMode: boolean;
  editedPromotion: Promotion | null | undefined;
  setEditedPromotion: React.Dispatch<
    React.SetStateAction<Promotion | null | undefined>
  >;
  axiosError: string | null;
  resetAxiosError: () => void;
}

const PromotionsModal: FC<PromotionsModalProps> = ({
  isOpen,
  promotion,
  onSaveEdit,
  onSaveAdd,
  onCloseEditModal,
  onCloseAddModal,
  isAddingMode,
  editedPromotion,
  setEditedPromotion,
  axiosError,
  resetAxiosError,
}) => {
  const id = useAppSelector((state) => state.promotionSlice.postId);
  const dispatch = useAppDispatch();
  const [isUpload, setUpload] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (promotion) {
      setEditedPromotion({ ...promotion });
    }
  }, [promotion, isAddingMode, setEditedPromotion]);

  const modalTitle = isAddingMode ? 'Новая акция' : 'Редактирование акции';

  const handleCancel = () => {
    setEditedPromotion(undefined);
    resetAxiosError();
    onCloseEditModal();
    onCloseAddModal();
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
        await axios.put(`${VITE_URL}/admin/promotionsPhoto/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (isAddingMode) {
          onCloseAddModal();
        } else {
          onCloseEditModal();
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
      let result2 = '';

      if (isAddingMode) {
        result = await onSaveAdd(editedPromotion as IPromotion);
      } else {
        result2 = await onSaveEdit(editedPromotion as IPromotion);
      }

      if (typeof result2 !== 'string') {
        setCurrentStep(2);
        setUpload(true);
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

      await uploadFile(file, id, isAddingMode);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    uploadFile(file, id, isAddingMode);
  };

  const handleDelete = () => {
    if (editedPromotion && editedPromotion.id) {
      const promotionId = editedPromotion.id;
      dispatch(deletePromotion(promotionId));
      onCloseEditModal();
    }
  };

  if (!isOpen || !editedPromotion) {
    return null;
  }

  const inputFields: InputField[] = [
    {
      id: 'promotionTitle',
      type: 'text',
      value: editedPromotion.title,
      autoComplete: 'off',
      placeholder: '',
      title: 'Название акции',
      htmlFor: 'promotionName',
      onChange: (value: string) =>
        setEditedPromotion({
          ...editedPromotion,
          title: value,
        }),
      required: true,
    },
    // {
    //   id: 'description',
    //   type: 'text',
    //   value: editedPromotion.description,
    //   autoComplete: 'off',
    //   placeholder: '',
    //   title: 'Описание акции',
    //   htmlFor: 'description',
    //   onChange: (value: string) =>
    //     setEditedPromotion({
    //       ...editedPromotion,
    //       description: value,
    //     }),
    // },
    {
      id: 'invisible',
      type: 'text',
      value: editedPromotion.invisible,
      title: 'Акция скрыта',
      htmlFor: 'isDiscounted',
      onChange: (value: boolean) =>
        setEditedPromotion({
          ...editedPromotion,
          invisible: value,
        }),
    },
    {
      id: 'dateStart',
      type: 'text',
      value: editedPromotion.dateStart,
      autoComplete: 'off',
      placeholder: '',
      title: 'Начало акции',
      htmlFor: 'dateStart',
      onChange: (value: string) =>
        setEditedPromotion({
          ...editedPromotion,
          dateStart: value,
        }),
      required: true,
    },
    {
      id: 'carousel',
      type: 'text',
      value: editedPromotion.carousel,
      title: 'Карусель',
      htmlFor: 'carousel',
      onChange: (value: boolean) =>
        setEditedPromotion({
          ...editedPromotion,
          carousel: value,
        }),
    },
    {
      id: 'dateEnd',
      type: 'text',
      value: editedPromotion.dateEnd,
      autoComplete: 'off',
      placeholder: '',
      title: 'Конец акции',
      htmlFor: 'dateEnd',
      onChange: (value: string) =>
        setEditedPromotion({
          ...editedPromotion,
          dateEnd: value,
        }),
      required: true,
    },
  ];

  return (
    <Wrapper>
      <form onSubmit={handleFormSubmit}>
        <Modal
          modalTitle={modalTitle}
          isAddingMode={isAddingMode}
          onDeleteClick={handleDelete}
          onCancellick={handleCancel}
          isUpload={isUpload}
        >
          <div className="input-modal-container">
            {axiosError && (
              <div className="text-sm text-rose-400 text-center mt-2">
                {axiosError}
              </div>
            )}
            {currentStep === 1 && (
              <InputModal
                containerClassName={
                  'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'
                }
                inputFields={inputFields}
              />
            )}
            {currentStep === 1 && (
              <div className="description-container resize-y overflow-auto min-h-50">
                <label htmlFor="description" className="text-slate-400 text-sm">
                  Описание промо
                </label>
                <ReactQuill
                  theme="snow"
                  value={editedPromotion.description}
                  onChange={(value) =>
                    setEditedPromotion({
                      ...editedPromotion,
                      description: value,
                    })
                  }
                  // placeholder=""
                  className="w-full"
                />
              </div>
            )}
          </div>

          {currentStep === 2 && (
            <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-md dark:bg-neutral-700">
              <div className="px-4 sm:px-0 text-center">
                <h1 className="text-xl font-bold mb-4">
                  Форма загрузки фотографии акции
                </h1>
                <span className="block mt-2 text-sm text-gray-500">
                  Если фотографию акции менять не нужно, вы можете пропустить
                  этот шаг
                </span>
                <div className="mt-6">
                  <div className="mb-4">
                    <input
                      type="file"
                      id="fileInput"
                      name="promotionPhoto"
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
          )}
        </Modal>
      </form>
    </Wrapper>
  );
};

export default PromotionsModal;
