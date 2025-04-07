import { FC } from 'react';

interface IButton {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  title: string;
  icon?: React.ReactNode | undefined;
  styleCSSButton?: string | string[];
  styleCSSSpan?: string | string[];
}

const Button: FC<IButton> = ({
  onClick,
  type,
  title,
  icon,
  styleCSSButton = [
    'w-full flex items-center justify-center w-1/2 px-5 py-2 mr-2 text-sm transition-colors duration-200 p-0.5 group bg-gradient-to-br from-teal-300 to-lime-300 hover:bg-gradient-to-bl from-teal-400 to-lime-500 rounded-lg gap-x-2 sm:w-auto',
  ],
  styleCSSSpan = ['text-sm text-slate-50 dark:text-slate-400'],
}) => {
  return (
    <button onClick={onClick} type={type} className={`${styleCSSButton}`}>
      {icon}
      <span className={`${styleCSSSpan}`}>{title}</span>
    </button>
  );
};

export default Button;
