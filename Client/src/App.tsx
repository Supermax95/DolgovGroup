//import { useEffect } from 'react';
import './App.css';
import Navigation from './Navigation/Navigation';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { IManager } from './Redux/manager.slice';
//import portalLogin from './Redux/thunks/PortalLogin/portalLogin.api';

function App() {
  const dispatch = useAppDispatch();

  const manager = useAppSelector<IManager>(
    (state) => state.managerLogin.manager
  );
  console.log('manApp', manager);

  // useEffect(() => {
  //   if (manager.email) {
  //     dispatch(portalLogin(manager));
  //   }
  // }, [manager, dispatch]);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
