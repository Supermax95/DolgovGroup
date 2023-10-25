import React, { FC } from 'react';

interface IButton {
  onClick?: () => void;
  title: string;
  styleCSSButton?: string[];
  styleCSSSpan?: string[];
  // disabled?: boolean;
}

const Button: FC<IButton> = ({
  onClick,
  title,
  styleCSSButton = [
    'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-slate-700 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300',
  ],
  styleCSSSpan = [
    'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0',
  ],
}) => {
  return (
    <button onClick={onClick} className={`${styleCSSButton}`}>
      <span className={`${styleCSSSpan}`}> {title}</span>
    </button>
  );
};

export default Button;
