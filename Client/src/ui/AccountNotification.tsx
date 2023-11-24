import React, { FC } from 'react';

interface IAccountNotification {
  showNotification: boolean;

  onClickClose: () => void;
  titleText: React.ReactNode;
  bodyText?: React.ReactNode | undefined;
}

const AccountNotification: FC<IAccountNotification> = ({
  showNotification,
  onClickClose,
  titleText,
  bodyText,
}) => {
  return (
    <>
      {showNotification && (
        <div className="flex flex-col p-8 bg-slate-100 shadow-md hover:shadow-lg rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col ml-3">
                <div className="font-medium leading-none">{titleText}</div>
                <p className="text-sm text-slate-600 leading-none mt-2">
                  {bodyText}
                </p>
              </div>
            </div>
            <button
              onClick={onClickClose}
              className="flex-no-shrink bg-gradient-to-b from-orange-300 to-orange-400 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full"
            >
              Скрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountNotification;
