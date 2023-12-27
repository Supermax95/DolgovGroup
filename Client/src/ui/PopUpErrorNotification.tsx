import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React, { FC, useEffect } from 'react';
import { toast } from 'sonner';

interface IPopUpNotification {
  email?: string | undefined;
  titleText?: React.ReactNode | undefined;
  bodyText?: React.ReactNode | undefined;
}

const PopUpNotification: FC<IPopUpNotification> = ({
  titleText,
  email,
  bodyText,
}) => {
  useEffect(() => {
    toast.custom(
      (t) => (
        <div className="flex flex-col p-4 bg-rose-100 shadow-md hover:shadow-lg rounded-lg border border-rose-200">
          <div className="flex flex-col justify-start w-72">
            <div className="flex items-center space-x-1">
              <div className="rounded-full py-1">
                <ExclamationTriangleIcon className="w-4 h-4 text-rose-600" />
              </div>
              <p className="font-medium text-xs text-rose-800">{titleText}</p>
            </div>
            <p className="text-xs font-normal text-rose-600 mt-2">
              {bodyText} <span className="text-rose-800 ext-xs">{email}</span>
            </p>
            <button
              className="absolute py-1 right-1 top-2"
              onClick={() => toast.dismiss(t)}
            >
              <XMarkIcon className="cursor-pointer w-4 h-4 text-rose-400 hover:text-slate-600 mx-1" />
            </button>
          </div>
        </div>
      ),
      //   { duration: Infinity }
      { duration: 7000 }
    );
  }, [titleText, email, bodyText]);

  return null;
};

export default PopUpNotification;
