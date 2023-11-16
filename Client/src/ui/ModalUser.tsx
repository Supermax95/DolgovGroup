import React, { FC } from 'react';
import Button from './Button';
import { XMarkIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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
      <div role="alert" className="container mx-auto max-w-4xl">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-slate-400">
          <div className="flex justify-center items-center">
            <div className="w-8 text-gray-600">
              <UserGroupIcon className="w-6 h-6 text-slate-400" />
            </div>
            <h1 className="text-lime-600 text-lg font-bold tracking-normal leading-tight">
              {modalTitle}
            </h1>
          </div>
          {/* 
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  value={editedUser.lastName}
                  placeholder=""
                  autoComplete="off"
                  className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                >
                  Фамилия
                </label>
              </div>
            </div>
          </form> */}

          {children}

          <div className="flex items-center justify-center w-full">
            {/* <Button
              type="button"
              onClick={onSaveClick}
              styleCSSSpan={
                'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
              }
              title="Сохранить"
            /> */}
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
            <XMarkIcon className="w-6 h-6 icon icon-tabler icon-tabler-x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
