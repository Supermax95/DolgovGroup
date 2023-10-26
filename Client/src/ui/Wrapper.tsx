import React, { FC } from 'react';

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return <div className="mt-20 mx-auto w-11/12">{children} </div>;
};

export default Wrapper;
