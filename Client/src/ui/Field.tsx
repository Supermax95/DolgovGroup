import { FC } from 'react';
import InputMask from 'react-input-mask';

interface IInput {
  inputFields: IField[];
}

interface IField {
  onChange: (value: string) => void;
  id: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  autoCapitalize?: string;
  autoComplete: string;
  styleCSSInput?: string[];
  title: string;
  htmlFor: string;
  styleCSSLabel?: string[];
  required?: boolean;
  pattern?: string | undefined;
  children?: React.ReactNode;
  error?: React.ReactNode;
}

const Field: FC<IInput> = ({ inputFields }) => {
  return (
    <>
      {inputFields.map((field) => (
        <div key={field.id} className="relative">
          {field.id === 'phone' ? (
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
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </>
          ) : (
            <>
              <input
                onChange={(e) => field.onChange(e.target.value)}
                id={field.id}
                name={field.name}
                type={field.type}
                value={field.value}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                autoCapitalize={field.autoCapitalize}
                className="block py-2.5 px-0 w-full text-sm text-slate-500 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                required={field.required}
              />
              <label
                htmlFor={field.htmlFor}
                className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-400 peer-focus:text-sm"
              >
                {field.title}
              </label>
            </>
          )}
          {field.children}
          {field.error}
        </div>
      ))}
    </>
  );
};

export default Field;
