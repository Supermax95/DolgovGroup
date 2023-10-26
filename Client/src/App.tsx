import './App.css';
import { Route, Routes } from 'react-router-dom';
// components
import Portal from './components/Portal/Portal';
import Clients from './components/Admin/Clients/Clients';
import Employees from './components/Admin/Employees/Employees';
import Products from './components/Manager/Products/Products';
import Locations from './components/Manager/Locations/Locations';
import Stock from './components/Manager/Stock/Stock';
import ProfileAdmin from './components/Admin/ProfileAdmin/ProfileAdmin';
import ProfileManager from './components/Manager/ProfileManager/ProfileManager';

function App() {
  return (
    <>
      <Routes>
        <Route path="/portal" element={<Portal />} />

        <Route path="/clients" element={<Clients />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/products" element={<Products />} />
        <Route path="/locations" element={<Locations />} />

        <Route path="/stock" element={<Stock />} />

        <Route path="/profileAdmin" element={<ProfileAdmin />} />
        <Route path="/profileManager" element={<ProfileManager />} />

        <Route />
      </Routes>
    </>
  );
}

export default App;
