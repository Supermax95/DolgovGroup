import { ChangeEvent, FC } from 'react';

interface IField {
  onChange?: (value: string) => void;
  id: string;
  name: string;
  type: string;
  value?: string;
  placeholder: string;
  autoCapitalize?: string;
  autoComplete: string;
  styleCSSInput?: string[];
  title: string;
  htmlFor: string;
  styleCSSLabel?: string[];
  required?: boolean;
}

const Field: FC<IField> = ({
  onChange,
  id,
  name,
  type,
  value,
  placeholder,
  autoCapitalize,
  autoComplete,
  styleCSSInput = [
    'block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500',
  ],
  title,
  htmlFor,
  styleCSSLabel = [
    'absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm',
  ],
  required,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      <input
        onChange={handleChange}
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        className={`${styleCSSInput}`}
        required={required}
      />
      <label htmlFor={htmlFor} className={`${styleCSSLabel}`}>
        {title}
      </label>
    </>
  );
};

export default Field;
