import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
// components
import Portal from '../components/Portal/Portal';
import Clients from '../components/Admin/Clients/Clients';
import Employees from '../components/Admin/Employees/Employees';
import ProfileAdmin from '../components/Admin/ProfileAdmin/ProfileAdmin';
import Locations from '../components/Manager/Locations/Locations';
import Products from '../components/Manager/Products/Products';
import ProfileManager from '../components/Manager/ProfileManager/ProfileManager';
import Stock from '../components/Manager/Stock/Stock';

function Navigation() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/portal" element={<Portal />} />

          <Route path="/clients" element={<Clients />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/products" element={<Products />} />
          <Route path="/locations" element={<Locations />} />

          <Route path="/stock" element={<Stock />} />

          <Route path="/profileAdmin" element={<ProfileAdmin />} />
          <Route path="/profileManager" element={<ProfileManager />} />

          <Route />
        </Route>
      </Routes>
    </>
  );
}

export default Navigation;
