import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import { VITE_URL } from '../../../VITE_URL';
import axios, { AxiosResponse } from 'axios';
import deletePromotion from '../../../Redux/thunks/Promotion/deletePromotion.api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import { unwrapResult } from '@reduxjs/toolkit';
import deletePromoPhoto from '../../../Redux/thunks/Promotion/deletePromoPhoto.api';
import {
  ArrowUturnLeftIcon,
  CloudArrowUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Button from '../../../ui/Button';

interface Promotion {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  invisible: boolean;
  description: string;
  photo?: string;
  carousel: boolean;
}

interface PromotionsModalProps {
  isOpen: boolean;
  promotion: Promotion | null;
  onSaveEdit: (editedPromotion: Promotion) => void;
  onSaveAdd: (editedPromotion: Promotion) => void;
  onCloseEditModal: () => void;
  onCloseAddModal: () => void;
  isAddingMode: boolean;
  editedPromotion: Promotion | null | undefined;
  setEditedPromotion: React.Dispatch<
    React.SetStateAction<Promotion | null | undefined>
  >;
  // openEditModal: React.Dispatch<
  //   React.SetStateAction<Promotion | null | undefined>
  // >;
  openEditModal: (promotion: Promotion) => void;
  // axiosError: string | null;
  // resetAxiosError: () => void;
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
  openEditModal,
  // axiosError,
  // resetAxiosError,
}) => {
  const id = useAppSelector((state) => state.promotionSlice.postId);
  const dispatch = useAppDispatch();
  const promotions = useAppSelector<Promotion[]>(
    (state) => state.promotionSlice.data
  );
  const [isUpload, setUpload] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  //! message не выводится с бэка в случае положительного действия
  //! ошибка тоже не выгружается с бэка, т.к. ошибку он не допускает пока вовсе. Не знаю, обрабатывает ли вообще
  // const [messNotification, setMessNotification] = useState<string | null>(null);
  // const [errorNotification, setErrorNotification] = useState<string | null>(
  //   null
  // );

  const [showNotificationPicture, setShowNotificationPicture] =
    useState<boolean>(false);
  // const [showErrorNotificationPicture, setErrorShowNotificationPicture] =
  //   useState<boolean>(false);

  useEffect(() => {
    if (promotion) {
      setEditedPromotion({ ...promotion });
    }
  }, [promotion, isAddingMode, setEditedPromotion]);

  const modalTitle = isAddingMode ? 'Новая акция' : 'Редактирование акции';

  useEffect(() => {
    if (showNotificationPicture) {
      const timeoutId = setTimeout(() => {
        setShowNotificationPicture(false);
        // setErrorShowNotificationPicture(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [showNotificationPicture]);

  const handleCancel = () => {
    setEditedPromotion(undefined);
    // resetAxiosError();
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
        setShowNotificationPicture(true);
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
        // setErrorNotification(error as string | null);
        // setErrorShowNotificationPicture(true);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );

    if (currentStep === 1) {
      let result = '';
      let result2 = '';

      if (isAddingMode) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result = await onSaveAdd(editedPromotion as IPromotion);
      } else {
        if (isConfirmed) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result2 = await onSaveEdit(editedPromotion as IPromotion);
        }
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

      await uploadFile(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        file,
        id,
        isAddingMode
      );
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    uploadFile(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      file,
      id,
      isAddingMode
    );
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить акцию?');
    if (isConfirmed && editedPromotion && editedPromotion.id) {
      const promotionId = editedPromotion.id;

      try {
        dispatch(deletePromotion(promotionId));
        onCloseEditModal();
      } catch (error) {
        console.error('Произошла ошибка при удалении:', error);
      }
    }
  };

  const handleDeletePhoto = () => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить изображение?'
    );

    if (isConfirmed && editedPromotion && editedPromotion.id) {
      const promoId = editedPromotion.id;

      try {
        dispatch(deletePromoPhoto(promoId));
        onCloseEditModal();
      } catch (error) {
        console.error('Произошла ошибка при удалении:', error);
      }
    }
  };

  const handleBack = () => {
    const promotion = promotions.find((p) => p.id === id);

    if (promotion) {
      setEditedPromotion(undefined);
      onCloseEditModal();
      openEditModal(promotion);
    } else {
      console.error(`Promotion with id ${id} not found.`);
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
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedPromotion({
            ...editedPromotion,
            title: value,
          });
        }
      },
      required: true,
    },
  ];

  return (
    <Wrapper>
      {showNotificationPicture && (
        <PopUpNotification
          titleText={'Обложка акции загружена'}
          bodyText={`Наименование акции:`}
          name={editedPromotion.title}
        />
      )}

      {/* //!уведомления об ошибках */}
      {/* {showErrorNotificationPicture && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )} */}

      <form onSubmit={handleFormSubmit}>
        <Modal
          modalTitle={modalTitle}
          isAddingMode={isAddingMode}
          onDeleteClick={handleDelete}
          onCancelСlick={handleCancel}
          isUpload={isUpload}
        >
          {/* {axiosError && (
            <div className="text-sm text-rose-400 text-center mt-2">
              {axiosError}
            </div>
          )} */}

          {currentStep === 1 && (
            <InputModal
              // containerClassName={
              //   'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'
              // }
              inputFields={inputFields}
            />
          )}

          {currentStep === 1 && (
            <div className="flex space-x-2 items-center justify-between pb-4">
              <div className="flex space-x-2">
                <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                  Акция в основной карусели
                </h1>
                <input
                  id="isNew"
                  name="isNew"
                  checked={editedPromotion.carousel}
                  type="checkbox"
                  onChange={(e) =>
                    setEditedPromotion({
                      ...editedPromotion,
                      carousel: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-rose-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-rose-500"
                />
              </div>
              <div className="flex space-x-2">
                <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                  Скрыть для покупателей
                </h1>
                <input
                  id="isDiscounted"
                  name="isDiscounted"
                  checked={editedPromotion.invisible}
                  type="checkbox"
                  onChange={(e) =>
                    setEditedPromotion({
                      ...editedPromotion,
                      invisible: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-slate-400 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-slate-500"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <div className="text-center">
                <span className="text-xs text-orange-500 font-normal">
                  Если акция не имеет конкретного срока действия, оставьте
                  пустыми поля "Начало" и "Окончание".
                </span>
              </div>
              <div className="pt-4 pb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="relative">
                  <input
                    id="promoStartDate"
                    type="date"
                    value={editedPromotion.dateStart}
                    onChange={(e) =>
                      setEditedPromotion({
                        ...editedPromotion,
                        dateStart: e.target.value,
                      })
                    }
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                  />
                  <label
                    htmlFor="promoStartDate"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                  >
                    Начало акции
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="promoEndDate"
                    type="date"
                    value={editedPromotion.dateEnd}
                    onChange={(e) =>
                      setEditedPromotion({
                        ...editedPromotion,
                        dateEnd: e.target.value,
                      })
                    }
                    className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                  />
                  <label
                    htmlFor="promoEndDate"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
                  >
                    Окончание акции
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="description-container resize-y overflow-auto min-h-50 text-center">
              <label
                htmlFor="description"
                className="text-slate-600 text-sm font-normal"
              >
                Описание акции
              </label>
              <div className="mb-2"></div>

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
          <div className="mt-4"></div>

          {currentStep === 2 && (
            <>
              <div className="flex items-center justify-center mt-2">
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
                      Загрузите документ в формате IMG, PNG, WEBP или JPEG{' '}
                      <br />
                      Разрешение для карусели:{' '}
                      <span className="font-medium">1280x720px</span>
                      <br />
                      Разрешение для карточек:{' '}
                      <span className="font-medium"> 800x800px</span>
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
                      Если фотографию продукта менять не нужно, вы можете
                      пропустить этот шаг
                    </p>{' '}
                  </div>
                </label>
              </div>

              <div className="flex justify-between mt-2">
                <div>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-slate-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-slate-800 dark:bg-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:border-slate-700"
                  >
                    <ArrowUturnLeftIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Назад
                    </span>
                  </button>
                </div>

                <div>
                  {!isAddingMode &&
                    editedPromotion.photo !== '/uploads/noPhoto/null.jpeg' && (
                      <Button
                        type="button"
                        onClick={handleDeletePhoto}
                        styleCSSButton={
                          'w-full flex items-center justify-center w-1/2 px-5 py-2 mr-2 text-sm transition-colors duration-200 p-0.5 group bg-gradient-to-br from-red-500 to-rose-400 hover:bg-gradient-to-bl from-red-500 to-rose-400 rounded-lg gap-x-2 sm:w-auto'
                        }
                        icon={<TrashIcon className="w-4 h-4 text-slate-50" />}
                        title="Удалить изображение"
                      />
                    )}
                </div>
              </div>
            </>
          )}
        </Modal>
      </form>
    </Wrapper>
  );
};

export default PromotionsModal;
