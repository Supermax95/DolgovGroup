import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';
import { Toaster, toast } from 'sonner';

interface IPopUpNotification {
  //   showNotification?: boolean;
  email: string;
  titleText?: React.ReactNode | undefined;
  bodyText?: React.ReactNode | undefined;
}

const PopUpNotification: FC<IPopUpNotification> = ({
  titleText,
  email,
  bodyText,
}) => {
  return (
    <div>
      <Toaster position="bottom-left" expand={true} />

      {toast.custom(
        (t) => (
          <div className="flex flex-col p-4 bg-slate-50 shadow-md hover:shadow-lg rounded-lg border border-slate-200">
            <div className="flex flex-col justify-start w-72">
              <p className="font-medium text-xs text-slate-800">{titleText}</p>
              <p className="text-xs font-normal text-slate-600 mt-2">
                {bodyText}{' '}
                <span className="text-slate-800 ext-xs">{email}</span>
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
      )}
    </div>
  );
};

export default PopUpNotification;