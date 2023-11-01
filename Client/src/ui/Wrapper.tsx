import React, { FC } from 'react';

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return (
    <div className="mt-[70px] mx-auto">
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Wrapper;
