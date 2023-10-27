//import { useEffect } from 'react';
import { FC } from 'react';
import './App.css';
import Navigation from './Navigation/Navigation';
import {  useAppSelector } from './Redux/hooks';
import { IManager } from './Redux/manager.slice';



const App: FC = () => {

  const manager = useAppSelector<IManager>((state) => state.managerSlice.manager);
 
  console.log('manApp', manager);


  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
