import './App.css';
import { Route, Routes } from 'react-router-dom';
import Portal from './components/Portal/Portal';
import Locations from './components/Locations/Locations';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/about" element={<AboutCompany />} /> */}
        <Route path="/portal" element={<Portal />} />
        <Route path="/locations" element={<Locations/>} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
