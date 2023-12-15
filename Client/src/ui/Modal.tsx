import React, { FC } from 'react';
import Button from './Button';
import {
  BuildingStorefrontIcon,
  XMarkIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowPathIcon,
  ReceiptPercentIcon,
  ShoppingCartIcon,
} from '@heroicons/react/20/solid';

interface IModal {
  children: React.ReactNode;
  modalTitle: string;
  isAddingMode?: boolean | undefined;
  onDeleteClick?: () => void | undefined;
  onCancelСlick?: () => void | undefined;
  isUpload?: boolean;
}

const Modal: FC<IModal> = ({
  children,
  modalTitle,
  isAddingMode,
  onDeleteClick,
  onCancelСlick,
  isUpload,
}) => {
  const modalWidthClass =
    modalTitle === 'Новый продукт' || modalTitle === 'Редактирование продукта'
      ? 'w-11/12 md:w-2/3 max-w-2xl'
      : 'w-11/12 md:w-2/3 max-w-2xl';

  const isNewTitle =
    modalTitle.includes('Новый') ||
    modalTitle.includes('нового') ||
    modalTitle.includes('Новая');

  return (
    <div
      className="z-10 py-20 bg-slate-700 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center"
      id="modal"
    >
      <div
        role="alert"
        className={`container mx-auto max-w-2xl ${modalWidthClass}`}
      >
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-slate-400 modal-container max-h-[75vh] overflow-y-auto">
          <div className="flex justify-center items-center">
            {modalTitle === 'Регистрация нового менеджера' ||
            modalTitle === 'Редактирование данных менеджера' ? (
              <>
                <div className="w-8 text-gray-600">
                  <UserIcon className="w-6 h-6 text-slate-400" />
                </div>
              </>
            ) : modalTitle === 'Сброс пароля' ? (
              <div className="w-8 text-gray-600">
                <ArrowPathIcon className="w-6 h-6 text-slate-400" />
              </div>
            ) : modalTitle === 'Новый продукт' ||
              modalTitle === 'Редактирование продукта' ? (
              <div className="w-8 text-gray-600">
                <ShoppingCartIcon className="w-6 h-6 text-slate-400" />
              </div>
            ) : modalTitle === 'Новая акция' ||
              modalTitle === 'Редактирование акции' ? (
              <div className="w-8 text-gray-600">
                <ReceiptPercentIcon className="w-6 h-6 text-slate-400" />
              </div>
            ) : (
              <div className="w-8 text-gray-600">
                <BuildingStorefrontIcon className="w-6 h-6 text-slate-400" />
              </div>
            )}
            <h1 className="text-lime-600 text-lg font-bold tracking-normal leading-tight">
              {modalTitle}
            </h1>
          </div>
          <div className="text-center mt-2">
            {modalTitle === 'Регистрация нового менеджера' ||
            modalTitle === 'Сброс пароля' ? (
              <span className="text-sm text-amber-600 font-normal">
                Временный пароль будет сформирован автоматически <br /> и
                отправлен на указанный адрес электронной почты
              </span>
            ) : null}
          </div>

          {children}

          <div className="flex items-center justify-center w-full">
            {!isUpload && (
              <>
                {isAddingMode ? (
                  <Button
                    type="submit"
                    styleCSSSpan={
                      'w-44 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-slate-800'
                    }
                    title="Добавить"
                  />
                ) : modalTitle === 'Сброс пароля' ? (
                  <Button
                    type="submit"
                    styleCSSSpan={
                      'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                    }
                    title="Отправить"
                  />
                ) : (
                  <Button
                    type="submit"
                    styleCSSSpan={
                      'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                    }
                    title="Сохранить"
                  />
                )}

                {onDeleteClick && !isNewTitle && (
                  <Button
                    type="button"
                    onClick={onDeleteClick}
                    styleCSSButton={
                      'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-slate-700  rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white'
                    }
                    styleCSSSpan={
                      'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                    }
                    title="Удалить"
                  />
                )}
              </>
            )}
          </div>

          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-slate-400 hover:text-slate-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-slate-400"
            onClick={onCancelСlick}
            aria-label="close modal"
            role="button"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
