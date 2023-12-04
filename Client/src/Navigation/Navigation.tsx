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
import Promotions from '../components/Manager/Promotion/Promotions';
import { FC } from 'react';
import Footer from '../components/Footer/Footer';
import Management from '../components/Admin/ProfileAdmin/Management/Management';
import ListContact from '../components/Manager/ProfileManager/ListContact';

const Navigation: FC = () => {
  return (
    <div className="wrapperCss ">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/portal" element={<Portal />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/employees" element={<Employees />} />
          <Route
            path="/products"
            element={
              // <div className="contentCss">
              <Products />
              // </div>
            }
          />
          <Route path="/locations" element={<Locations />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/profileAdmin" element={<ProfileAdmin />} />
          <Route path="/profileManager" element={<ProfileManager />} />
          <Route path="/listOfManagers" element={<Management />} />
          <Route path="/listOfManagersForManager" element={<ListContact />} />
          <Route />
        </Route>
        {/* 
        //!не трогать
      <Route path="/portal" element={<Portal />} /> */}
      </Routes>
      {/* <div className="footerCss"> */}
      <Footer />
      {/* </div> */}

      {/* <Route path="/footer" element={<Footer />} /> */}
    </div>
  );
};

export default Navigation;
