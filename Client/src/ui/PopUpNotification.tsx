import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { FC, useEffect } from 'react';
import { toast } from 'sonner';

interface IPopUpNotification {
  email?: string | undefined;
  name?: string | undefined;
  titleText?: React.ReactNode | undefined;
  bodyText?: React.ReactNode | undefined;
}

const PopUpNotification: FC<IPopUpNotification> = ({
  titleText,
  email,
  name,
  bodyText,
}) => {
  useEffect(() => {
    toast.custom(
      (t) => (
        <div className="flex flex-col p-4 bg-slate-50 shadow-md hover:shadow-lg rounded-lg border border-slate-200">
          <div className="flex flex-col justify-start w-72">
            <h1 className="font-medium text-xs text-slate-800">{titleText}</h1>
            <p className="text-xs font-normal text-slate-600 mt-2">
              {bodyText}{' '}
              <span className="text-slate-800 ext-xs">{email || name}</span>
            </p>
            <button
              className="absolute py-1 right-1 top-2"
              onClick={() => toast.dismiss(t)}
            >
              <XMarkIcon className="cursor-pointer w-4 h-4 text-slate-400 hover:text-slate-600 mx-1" />
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
      // { duration: 7000 }
    );
  }, [titleText, email, name, bodyText]);

  return null;
};

export default PopUpNotification;
