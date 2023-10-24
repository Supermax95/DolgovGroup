import './App.css';
import { Route, Routes } from 'react-router-dom';
import Locations from './components/Locations/Locations';
function App() {
  return (
    <>
      <Routes>
        <Route path="/locations" element={<Locations/>} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
