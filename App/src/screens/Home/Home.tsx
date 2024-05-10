import React, { useEffect, FC } from 'react';
import HomeDetail from 'components/HomeDetail/HomeDetail';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getCheck from 'Redux/thunks/User/check.api';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  useEffect(() => {
    dispatch(getCheck({ token }));
  }, []);
  
  return <HomeDetail />;
};

export default Home;
