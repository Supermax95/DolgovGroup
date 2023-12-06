import React, { FC } from 'react';
import Button from './Button';
import { XMarkIcon, UserGroupIcon } from '@heroicons/react/24/outline';

//* Модальное окно используеются в компонентах Clients и Employees

interface IModalUser {
  children: React.ReactNode;
  modalTitle: string;
  isAddingMode?: boolean;
  onCancellick: () => void;
}

const ModalUser: FC<IModalUser> = ({
  children,
  modalTitle,
  isAddingMode,
  onCancellick,
}) => {
  return (
    <div
      className="py-20 bg-slate-700 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center"
      id="modal"
    >
      <div role="alert" className="container mx-auto max-w-2xl">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-slate-400">
          <div className="flex justify-center items-center">
            <div className="w-8 text-gray-600">
              <UserGroupIcon className="w-6 h-6 text-slate-400" />
            </div>
            <h1 className="text-lime-600 text-lg font-bold tracking-normal leading-tight">
              {modalTitle}
            </h1>
          </div>

          {children}

          <div className="flex items-center justify-center w-full mt-4">
            {isAddingMode ? (
              <Button
                type="submit"
                styleCSSSpan={
                  'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-slate-800'
                }
                title="Добавить"
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
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-slate-400 hover:text-slate-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-slate-400"
            onClick={onCancellick}
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

export default ModalUser;
