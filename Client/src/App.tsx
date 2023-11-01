import { FC, useEffect } from 'react';
import './App.css';
import Navigation from './Navigation/Navigation';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { IManager } from './Redux/manager.slice';
import portalCheck from './Redux/thunks/PortalLogin/portalCheck';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(portalCheck());
  }, [dispatch]);

  // const manager = useAppSelector<IManager>(
  //   (state) => state.managerSlice.manager
  // );
  //console.log('manApp', manager);

  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
