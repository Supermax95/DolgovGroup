import { FC, useEffect } from 'react';
import './App.css';
import Navigation from './Navigation/Navigation';
import { useAppDispatch } from './Redux/hooks';
import portalCheck from './Redux/thunks/PortalLogin/portalCheck';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(portalCheck());
  }, [dispatch]);

  

  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
