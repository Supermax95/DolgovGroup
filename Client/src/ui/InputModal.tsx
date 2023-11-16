import { FC } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import Button from './Button';

interface IInputModal {
  inputFields: InputField[];
  containerClassName?: string;
  codeSend?: () => void;
  activationSend?: () => void;
}

export interface InputField {
  id: string;
  name?: string;
  type?: string;
  value?: string | boolean | Date;
  placeholder?: string;
  autoComplete?: string;
  title?: string;
  htmlFor?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  divFielsCss?: string[];
  disabled?: boolean;
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
  error?: React.ReactNode;
}

const InputModal: FC<IInputModal> = ({
  inputFields,
  containerClassName = 'py-8 text-base leading-6 space-y-4 text-slate-700 sm:text-lg sm:leading-7',
  codeSend,
  activationSend,
}) => {
  return (
    <div className={`${containerClassName}`}>
      {inputFields.map((field) => (
        <div key={field.id} className="relative">
          {field.id === 'isActivated' ? (
            field.value ? (
              <div className="flex justify-between">
                <div className="flex justify-start items-center">
                  <CheckCircleIcon
                    className="h-8 w-8 text-lime-600"
                    aria-hidden="true"
                  />
                  <h1 className="text-lime-600 text-sm tracking-normal leading-tight">
                    Профиль активирован
                  </h1>
                </div>
                <div className="">
                  <Button
                    type="button"
                    title="Отправить код"
                    styleCSSButton={
                      'relative inline-flex items-center justify-center p-0.5 mb-0 mr-0 overflow-hidden text-sm font-medium text-slate-700 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 hover:text-white'
                    }
                    onClick={codeSend}
                    styleCSSSpan={
                      'w-44 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div className="flex justify-start items-center">
                  <XCircleIcon
                    className="h-8 w-8 text-orange-400"
                    aria-hidden="true"
                  />
                  <h1 className="text-orange-400 text-sm tracking-normal leading-tight">
                    Профиль не активирован
                  </h1>
                </div>
                <div className="">
                  <Button
                    type="button"
                    title="Отправить ссылку"
                    styleCSSButton={
                      'relative inline-flex items-center justify-center p-0.5 mb-0 mr-0 overflow-hidden text-sm font-medium text-slate-700 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 hover:text-white'
                    }
                    onClick={activationSend}
                    styleCSSSpan={
                      'w-44 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-sm font-normal rounded-md group-hover:bg-opacity-0 hover:text-white'
                    }
                  />
                </div>
              </div>
            )
          ) : field.disabled === true ? (
            <>
              <input
                onChange={(e) => field.onChange(e.target.value)}
                id={field.id}
                type={field.type}
                value={field.value as string}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="block py-2.5 px-0 w-full text-sm text-slate-400 bg-transparent border-0 border-b-2 border-slate-300 "
                required={field.required}
                disabled={field.disabled}
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </>
          ) : field.id === 'userStatus' ? (
            <div className="relative">
              <select
                id={field.id}
                value={field.value as string}
                onChange={(e) => field.onChange(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                required={field.required}
                disabled={field.disabled}
              >
                {field.options?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-slate-600"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </div>
          ) : (
            <div>
              <input
                onChange={(e) => field.onChange(e.target.value)}
                id={field.id}
                type={field.type}
                value={field.value as string}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                required={field.required}
                disabled={field.disabled}
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
              >
                {field.title}
              </label>
              {field.children}
              {field.error}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InputModal;
