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
// import Promotions from '../components/Manager/Promotion/Promotions';
import { FC } from 'react';
import Footer from '../components/Footer/Footer';
import Management from '../components/Admin/ProfileAdmin/Management/Management';
import ListContact from '../components/Manager/ProfileManager/ListContact';
import Nocarousel from '../components/Manager/Promotion/Nocarousel';
import Carousel from '../components/Manager/Promotion/Carousel';
import Success from '../components/Success/Success';
import NotFound from '../components/404/NotFound';
import { useAppSelector } from '../Redux/hooks';

const Navigation: FC = () => {
  const manager = useAppSelector((state) => state.managerSlice.manager);
  console.log('manager в навигации', manager);


return (
  <div className="wrapperCss">
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
            {/* <Route path="/promotions" element={<Promotions />} /> */}
            <Route path="/profileAdmin" element={<ProfileAdmin />} />
            <Route path="/profileManager" element={<ProfileManager />} />
            <Route path="/listOfManagers" element={<Management />} />
            <Route path="/listOfManagersForManager" element={<ListContact />} />
            <Route path="/promotions/carousel" element={<Carousel/>} />
            <Route path="/promotions/nocarousel" element={<Nocarousel/>} />
            <Route path="/registration/success" element={<Success/>} />
            <Route path="*" element={<NotFound />} />
            <Route />
          </Route>
          {/*
          //!не трогать
        <Route path="/portal" element={<Portal />} /> */}
        </Routes>
        <Footer />
        {/* <div className="footerCss"> */}
        {/* </div> */}

        {/* <Route path="/footer" element={<Footer />} /> */}
      </div>

    );
  };

  export default Navigation;





//   return (
//     <div className="wrapperCss">
//       <Routes>
//         <Route path="/" element={manager.email ? <Navbar /> : null}>
//           <Route
//             path="/portal"
//             element={manager.email ? <Locations /> : <Portal />}
//           />
//           <Route
//             path="/clients"
//             element={manager.email ? <Clients /> : <Portal />}
//           />
//           <Route
//             path="/employees"
//             element={manager.email ? <Employees /> : <Portal />}
//           />
//           <Route
//             path="/products"
//             element={
//               // <div className="contentCss">
//               manager.email ? <Products /> : <Portal />
//               // </div>
//             }
//           />
//           <Route
//             path="/locations"
//             element={manager.email ? <Locations /> : <Portal />}
//           />
//           {/* <Route path="/promotions" element={<Promotions />} /> */}
//           <Route
//             path="/profileAdmin"
//             element={manager.email ? <ProfileAdmin /> : <Portal />}
//           />
//           <Route
//             path="/profileManager"
//             element={manager.email ? <ProfileManager /> : <Portal />}
//           />
//           <Route
//             path="/listOfManagers"
//             element={manager.email ? <Management /> : <Portal />}
//           />
//           <Route
//             path="/listOfManagersForManager"
//             element={manager.email ? <ListContact /> : <Portal />}
//           />
//           <Route
//             path="/promotions/carousel"
//             element={manager.email ? <Carousel /> : <Portal />}
//           />
//           <Route
//             path="/promotions/nocarousel"
//             element={manager.email ? <Nocarousel /> : <Portal />}
//           />
//           <Route path="/registration/success" element={<Success />} />
//           <Route path="*" element={<NotFound />} />
//           <Route />
//         </Route>
//         {/* 
//         //!не трогать
//       <Route path="/portal" element={<Portal />} /> */}
//       </Routes>
//       <Footer />
//       {/* <div className="footerCss"> */}
//       {/* </div> */}

//       {/* <Route path="/footer" element={<Footer />} /> */}
//     </div>
//   );
// };

// export default Navigation;
