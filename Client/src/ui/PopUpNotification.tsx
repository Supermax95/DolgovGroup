// import { XMarkIcon } from '@heroicons/react/24/outline';
// import React, { FC } from 'react';
// import { Toaster, toast } from 'sonner';

// interface IPopUpNotification {
//   //   showNotification?: boolean;
//   email: string;
//   titleText?: React.ReactNode | undefined;
//   bodyText?: React.ReactNode | undefined;
// }

// const PopUpNotification: FC<IPopUpNotification> = ({
//   titleText,
//   email,
//   bodyText,
// }) => {
//   return (
//     <>
//       <Toaster position="bottom-left" expand={true} />
//       {/* <button
//         onClick={() => {
//           toast.custom(
//             (t) => (
//               <div className="flex flex-col p-4 bg-slate-50 shadow-md hover:shadow-lg rounded-lg border border-slate-200">
//                 <div className="flex flex-col justify-start w-72">
//                   <p className="font-medium text-xs text-slate-800">
//                     {titleText}
//                   </p>
//                   <p className="text-xs font-normal text-slate-600 mt-2">
//                     {bodyText}{' '}
//                     <span className="text-slate-800 ext-xs">{email}</span>
//                   </p>
//                   <button
//                     className="absolute py-1 right-1 top-2"
//                     onClick={() => toast.dismiss(t)}
//                   >
//                     <XMarkIcon className="cursor-pointer w-4 h-4 text-slate-400 hover:text-slate-600 mx-1" />
//                   </button>
//                 </div>
//               </div>
//             ),
//             { duration: Infinity }
//           );
//         }}
//       >
//         </button> */}
//       {toast.custom(
//         (t) => (
//           <div className="flex flex-col p-4 bg-slate-50 shadow-md hover:shadow-lg rounded-lg border border-slate-200">
//             <div className="flex flex-col justify-start w-72">
//               <p className="font-medium text-xs text-slate-800">{titleText}</p>
//               <p className="text-xs font-normal text-slate-600 mt-2">
//                 {bodyText}{' '}
//                 <span className="text-slate-800 ext-xs">{email}</span>
//               </p>
//               <button
//                 className="absolute py-1 right-1 top-2"
//                 onClick={() => toast.dismiss(t)}
//               >
//                 <XMarkIcon className="cursor-pointer w-4 h-4 text-slate-400 hover:text-slate-600 mx-1" />
//               </button>
//             </div>
//           </div>
//         ),
//         { duration: Infinity }
//       )}
//     </>
//   );
// };

// export default PopUpNotification;

import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { FC, useEffect, useState } from 'react';
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
  const [notificationKey, setNotificationKey] = useState(0);

  useEffect(() => {
    const toastId = toast.custom(
      (t) => (
        <div className="flex flex-col p-4 bg-slate-50 shadow-md hover:shadow-lg rounded-lg border border-slate-200">
          <div className="flex flex-col justify-start w-72">
            <p className="font-medium text-xs text-slate-800">{titleText}</p>
            <p className="text-xs font-normal text-slate-600 mt-2">
              {bodyText} <span className="text-slate-800 ext-xs">{email}</span>
            </p>
            <button
              className="absolute py-1 right-1 top-2"
              // onClick={() => toast.dismiss(t)}
              onClick={() => {
                toast.dismiss(t);
                // Incrementing the key to force rendering a new notification
                setNotificationKey((prevKey) => prevKey + 1);
              }}
            >
              <XMarkIcon className="cursor-pointer w-4 h-4 text-slate-400 hover:text-slate-600 mx-1" />
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );

    return () => {
      // Cleanup function to dismiss the toast when the component is unmounted
      toast.dismiss(toastId);
    };
  }, [notificationKey, titleText, email, bodyText]);
  // The empty dependency array ensures that this effect runs only once on mount

  // The rest of your component code
  return null; // or whatever your component renders
};
export default PopUpNotification;
