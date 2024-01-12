import { FC } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import Button from './Button';
import InputMask from 'react-input-mask';
import 'react-quill/dist/quill.snow.css';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

//* Здесь инпуты, которые переиспользуются в модальных окнах
//* На Location, в профиле админа (создание/редактирование менеджера) - один столбец
//* На Clients, Employees два столбца

interface IInputModal {
  inputFields: InputField[];
  containerClassName?: string;
  codeSend?: () => void;
  activationSend?: () => void;
  modalTitle?: string;
}

export interface InputField {
  id: string;
  name?: string;
  type?: (string | boolean) | undefined;
  value?: string | boolean | number | Date;
  placeholder?: string;
  autoComplete?: string;
  title?: string;
  htmlFor?: string;
  required?: boolean;
  pattern?: string | undefined;
  // onChange?: (value: string) => void | undefined;
  onChange?: (
    value: string | boolean | number | Date
  ) => void | false | 0 | undefined;
  divFielsCss?: string[];
  disabled?: boolean;
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
  error?: React.ReactNode;
}

const InputModal: FC<IInputModal> = ({
  inputFields,
  containerClassName = 'py-8 space-y-4',
  codeSend,
  activationSend,
  modalTitle,
}) => {
  return (
    <div className={`${containerClassName}`}>
      {inputFields.map((field) => (
        <div key={field.id} className="relative">
          {field.id === 'carousel' ? (
            <div className="flex space-x-2 justify-end">
              <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                {field.title}
              </h1>
              <input
                type="checkbox"
                checked={field.value as boolean}
                onChange={() => field.onChange?.(!field.value as boolean)}
                className="w-4 h-4 text-slate-600 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-slate-500"
              />
            </div>
          ) : field.id === 'invisible' ? (
            <div className="flex space-x-2 justify-end">
              <h1 className="text-slate-600 text-sm tracking-normal leading-tight">
                {field.title}
              </h1>
              <input
                type="checkbox"
                checked={field.value as boolean}
                onChange={() => field.onChange?.(!field.value as boolean)}
                className="w-4 h-4 text-slate-400 text-sm font-normal bg-slate-100 border-slate-300 rounded focus:ring-slate-500"
              />
            </div>
          ) : field.id === 'dateStart' || field.id === 'dateEnd' ? (
            <>
              <input
                id={field.id}
                type="date"
                value={field.value as string}
                onChange={(e) => field.onChange?.(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </>
          ) : field.id === 'isActivated' ? (
            field.value ? (
              <div className="mt-2 flex items-center space-y-2 flex-col">
                <div className="flex space-x-1 items-center justify-center">
                  <CheckCircleIcon
                    className="h-5 w-5 text-lime-600"
                    aria-hidden="true"
                  />
                  <h1 className="text-lime-600 text-sm tracking-normal leading-tight">
                    Профиль активирован
                  </h1>
                </div>
                {/* //! Не удалять */}
                {/* <div>
                  {modalTitle === 'Редактирование анкеты клиента' ? null : (
                    <Button
                      type="button"
                      styleCSSButton={
                        'w-full flex items-center justify-center w-1/2 px-5 py-2 mr-2 text-sm transition-colors duration-200 p-0.5 group bg-gradient-to-br from-teal-300 to-lime-300 hover:bg-gradient-to-bl from-teal-400 to-lime-500 rounded-lg gap-x-2 sm:w-auto'
                      }
                      onClick={codeSend}
                      // icon={<HandThumbUpIcon className="w-4 h-4 text-slate-50" />}
                      title="Отправить код"
                    />
                  )}
                </div> */}
              </div>
            ) : (
              <div className="flex items-center space-y-2 flex-col">
                <div className="flex space-x-1 items-center">
                  <XCircleIcon
                    className="h-5 w-5 text-orange-400"
                    aria-hidden="true"
                  />
                  <h1 className="text-orange-400 text-sm tracking-normal leading-tight">
                    Профиль не активирован
                  </h1>
                </div>
                <div>
                  <Button
                    type="button"
                    styleCSSButton={
                      'w-full flex items-center justify-center w-1/2 px-5 py-2 mr-2 text-sm transition-colors duration-200 p-0.5 group bg-gradient-to-br from-orange-300 to-red-300 hover:bg-gradient-to-bl from-orange-400 to-red-500 rounded-lg gap-x-2 sm:w-auto'
                    }
                    onClick={activationSend}
                    // icon={<HandThumbUpIcon className="w-4 h-4 text-slate-50" />}
                    title="Отправить ссылку для активации"
                  />
                </div>
              </div>
            )
          ) : field.disabled === true ? (
            <>
              <input
                onChange={(e) => field.onChange?.(e.target.value)}
                id={field.id}
                type={field.type as string}
                value={field.value as string}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="block py-2.5 px-0 w-full text-sm text-slate-400 bg-transparent border-0 border-b-2 border-slate-300 "
                required={field.required}
                disabled={field.disabled}
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
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
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </div>
          ) : field.id === 'city' ? (
            <div className="relative">
              <input
                value={field.value as string}
                onChange={(e) => field.onChange?.(e.target.value)}
                id={field.id}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                type="text"
                list="cityList"
                pattern={field.pattern}
                required={field.required}
                disabled={field.disabled}
                autoComplete={field.autoComplete}
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
              >
                {field.title}
              </label>
              <datalist id="cityList">
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value} />
                ))}
              </datalist>
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
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </>
          ) : (
            // ) :
            // field.id === 'originalPrice' ||
            //   field.id === 'customerPrice' ||
            //   field.id === 'employeePrice' ? (
            //   <>
            //     <InputMask
            //       // mask="+7 (999) 999-99-99"
            //       // maskChar="_"
            //       id={field.id}
            //       name={field.name}
            //       value={field.value as string}
            //       placeholder={field.placeholder}
            //       autoComplete={field.autoComplete}
            //       className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
            //       required={field.required}
            //       pattern={field.pattern}
            //       onChange={(e) => field.onChange?.(e.target.value)}
            //       disabled={field.disabled}
            //     />
            //     <label
            //       htmlFor={field.htmlFor}
            //       className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
            //     >
            //       {field.title}
            //     </label>
            //   </>
            <div>
              <input
                onChange={(e) => field.onChange?.(e.target.value)}
                id={field.id}
                type={field.type as string}
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
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
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
