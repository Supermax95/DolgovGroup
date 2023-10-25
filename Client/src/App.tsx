import './App.css';
import { Route, Routes } from 'react-router-dom';
import Portal from './components/Portal/Portal';
import { VITE_URL } from './VITE_URL';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/about" element={<AboutCompany />} /> */}
        <Route path="/portal" element={<Portal />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
