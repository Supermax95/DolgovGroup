import React, { FC } from 'react';
import Button from './Button';

interface IModal {
  children: React.ReactNode;
  modalTitle: string;
  isAddingMode: boolean;
  onAddClick: () => void;
  onSaveClick: () => void;
  onDeleteClick: () => void;
  onCancellick: () => void;
}

const Modal: FC<IModal> = ({
  children,
  modalTitle,
  isAddingMode,
  onAddClick,
  onSaveClick,
  onDeleteClick,
  onCancellick,
}) => {
  return (
    <div
      className="py-20 bg-slate-700 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-slate-400">
          {/* <div className="container mx-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-3xl border border-gray-400"> */}
          <div className="flex justify-center items-center">
            <div className="w-8 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#94a3b8"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>
            </div>
            <h1 className="text-lime-600 text-lg font-bold tracking-normal leading-tight">
              {modalTitle}
            </h1>
          </div>

          {children}

          <div className="flex items-center justify-center w-full">
            {isAddingMode ? (
              <Button
                type="button"
                onClick={onAddClick}
                styleCSSSpan={
                  'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-slate-800'
                }
                title="Добавить"
              />
            ) : (
              <Button
                type="button"
                onClick={onSaveClick}
                styleCSSSpan={
                  'w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                }
                title="Сохранить"
              />
            )}
            {location && !isAddingMode && (
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
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={onCancellick}
            aria-label="close modal"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
