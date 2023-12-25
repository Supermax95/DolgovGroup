import React, { FC } from 'react';

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return (
    <div className="pt-[70px] mx-auto max-w-screen-xl">
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Wrapper;
