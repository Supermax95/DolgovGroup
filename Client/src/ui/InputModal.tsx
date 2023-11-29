import { FC } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import Button from './Button';
import InputMask from 'react-input-mask';

//* Здесь инпуты, которые переиспользуются в модальных окнах
//* На Location, в профиле админа (создание/редактирование менеджера) - один столбец
//* На Clients, Employees два столбца

interface IInputModal {
  inputFields: InputField[];
  containerClassName?: string;
  codeSend?: () => void;
  activationSend?: () => void;
}

export interface InputField {
  id: string;
  name?: string;
  type?: (string | boolean) | undefined;
  value?: string | boolean | Date;
  placeholder?: string;
  autoComplete?: string;
  title?: string;
  htmlFor?: string;
  required?: boolean;
  pattern?: string | undefined;
  onChange?: (value: string) => void | undefined;
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
          {field.id === 'isNew' || field.id === 'isDiscounted' ? (
            <div className="flex items-center">
              <span>{field.title}</span>
              <input
                type="checkbox"
                checked={field.value as boolean}
                onChange={() => field.onChange?.(!field.value as boolean)}
                className="form-checkbox h-5 w-5 text-green-400 ml-2"
              />
            </div>
          ) : field.id === 'promoStartDate' || field.id === 'promoEndDate' ? (
            <div className={`flex items-center `}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700"
              >
                {field.title}
              </label>
              <input
                type="date"
                value={field.value as string}
                onChange={(e) => field.onChange?.(e.target.value)}
                className="block w-full px-4 py-2 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : field.id === 'description' ? (
            <div className="relative mb-3" data-te-input-wrapper-init>
              <textarea
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id={field.id}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              ></textarea>
              <label
                htmlFor={field.htmlFor}
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                {field.title}
              </label>
            </div>
          ) : field.id === 'isActivated' ? (
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
                onChange={(e) => field.onChange?.(e.target.value)}
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
          ) : field.id === 'userStatus' ||
            field.id === 'subcategoryId' ||
            field.id === 'categoryName' ? (
            <div className="relative">
              <select
                id={field.id}
                value={field.value as string}
                onChange={(e) => field.onChange?.(e.target.value)}
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
          ) : field.id === 'phone' ? (
            <>
              <InputMask
                mask="+7 (999) 999-99-99"
                maskChar="_"
                id={field.id}
                name={field.name}
                value={field.value as string}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                required={field.required}
                pattern={field.pattern}
                onChange={(e) => field.onChange?.(e.target.value)}
                disabled={field.disabled}
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </>
          ) : (
            <div>
              <input
                onChange={(e) => field.onChange?.(e.target.value)}
                id={field.id}
                type={field.type}
                value={field.value as string}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                required={field.required}
                pattern={field.pattern}
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
