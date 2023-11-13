// import { FC } from 'react';
// import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

// interface IInputModal {
//   inputFields: InputField[];
//   containerClassName?: string; // Добавил новый prop для класса
// }

// export interface InputField {
//   id: string;
//   type: string;
//   value?: string;
//   placeholder: string;
//   autoCapitalize?: string;
//   autoComplete: string;
//   title: string;
//   htmlFor: string;
//   required?: boolean;
//   onChange: (value: string) => void;
//   divFielsCss?: string[];
// }

// const InputModal: FC<IInputModal> = ({
//   inputFields,
//   containerClassName = 'py-8 text-base leading-6 space-y-4 text-slate-700 sm:text-lg sm:leading-7',
// }) => {
//   return (
//     <div className={`${containerClassName}`}>
//       {inputFields.map((field) => (
//         <div key={field.id} className="relative">
//           {field.title ? (
//           (
//             <span className="flex justify-center">
//               <CheckCircleIcon
//                 className="h-8 w-8 text-lime-600"
//                 aria-hidden="true"
//               />
//                Активирован
//             </span>
//           ) : (
//             <span className="flex justify-center">
//               <XCircleIcon
//                 className="h-8 w-8 text-orange-400"
//                 aria-hidden="true"
//               />
//               Не  Активирован

//             </span>
//           )
//           ) : (
//             <>
//               <input
//                 onChange={(e) => field.onChange(e.target.value)}
//                 id={field.id}
//                 type={field.type}
//                 value={field.value}
//                 placeholder={field.placeholder}
//                 autoComplete={field.autoComplete}
//                 autoCapitalize={field.autoCapitalize}
//                 className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
//                 required={field.required}
//               />
//               <label
//                 htmlFor={field.htmlFor}
//                 className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
//               >
//                 {field.title}
//               </label>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InputModal;

import { FC } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

interface IInputModal {
  inputFields: InputField[];
  containerClassName?: string; // Добавил новый prop для класса
}

export interface InputField {
  id: string;
  type: string;
  value?: string | boolean;
  placeholder: string;
  autoCapitalize?: string;
  autoComplete: string;
  title?: string;
  htmlFor: string;
  required?: boolean;
  onChange: (value: string) => void;
  divFielsCss?: string[];
}

const InputModal: FC<IInputModal> = ({
  inputFields,
  containerClassName = 'py-8 text-base leading-6 space-y-4 text-slate-700 sm:text-lg sm:leading-7',
}) => {
  return (
    <div className={`${containerClassName}`}>
      {inputFields.map((field) => (
        <div key={field.id} className="relative">
          {field.id === 'isActivated' ? (
            field.value ? (
              <div className="flex justify-start items-center">
                <CheckCircleIcon
                  className="h-8 w-8 text-lime-600"
                  aria-hidden="true"
                />
                <h1 className="text-lime-600 text-sm tracking-normal leading-tight">
                  Профиль активирован
                </h1>
              </div>
            ) : (
              <div className="flex justify-start items-center">
                <XCircleIcon
                  className="h-8 w-8 text-orange-400"
                  aria-hidden="true"
                />
                <h1 className="text-orange-400 text-sm tracking-normal leading-tight">
                  Профиль не активирован
                </h1>
              </div>
            )
          ) : (
            <>
              <input
                onChange={(e) => field.onChange(e.target.value)}
                id={field.id}
                type={field.type}
                value={field.value as string}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                autoCapitalize={field.autoCapitalize}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                required={field.required}
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default InputModal;
