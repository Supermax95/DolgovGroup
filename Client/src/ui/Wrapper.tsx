import React, { FC } from 'react';

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return (
    <div className="mt-20 mx-auto">
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Wrapper;
