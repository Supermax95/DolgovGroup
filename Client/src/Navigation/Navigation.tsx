import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
// components
import Portal from '../components/Portal/Portal';
import Clients from '../components/Admin/Clients/Clients';
import Employees from '../components/Admin/Employees/Employees';
import ProfileAdmin from '../components/Admin/ProfileAdmin/ProfileAdmin';
import Locations from '../components/Manager/Locations/Locations';
import Products from '../components/Manager/Products/Products';
import ProfileManager from '../components/Manager/ProfileManager/ProfileManager';
import { FC, useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Management from '../components/Admin/ProfileAdmin/Management/Management';
import ListContact from '../components/Manager/ProfileManager/ListContact';
import Nocarousel from '../components/Manager/Promotion/Nocarousel';
import Carousel from '../components/Manager/Promotion/Carousel';
import Success from '../components/Success/Success';
import NotFound from '../components/404/NotFound';
import { useAppSelector } from '../Redux/hooks';
import Law from '../components/Admin/Laws/Laws';
import LoadingAnimation from '../components/Admin/Laws/Loading';

const Navigation: FC = () => {
  const manager = useAppSelector((state) => state.managerSlice.manager);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();



  // useEffect(() => {
  //   const navigateToLocations = () => {
  //     setLoading(false);
  //     navigate('/locations');
  //   };

  //   if (window.location.pathname.includes('/portal') && manager.email) {
  //     setLoading(true);
  //     setTimeout(navigateToLocations, 1000);
  //   }
  // }, [manager.email, navigate]);

  useEffect(() => {
    const navigateToLocations = () => {
      setLoading(false);
      navigate('/locations');
    };

    if (manager.email) {
      setLoading(false);
    } else {
      navigate('/portal');
      setLoading(false);
    }

    if (window.location.pathname.includes('/portal') && manager.email) {
      setLoading(true);
      setTimeout(navigateToLocations, 1000);
    }
  }, [manager.email, navigate]);

  if (isLoading) {
    return (
      <div className="bg-white p-1 rounded-sm z-10 py-20 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="bg-white p-1 rounded-sm z-10 py-20 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center ">
          <LoadingAnimation />
        </div>
      )}
      <div className="wrapperCss">
        <Routes>
          <Route path="/" element={manager.email ? <Navbar /> : null}>
            <Route
              path="/portal"
              element={manager.email ? <Locations /> : <Portal />}
            />
            <Route
              path="/clients"
              element={
                manager.email && manager.isAdmin ? (
                  <Clients />
                ) : manager.email ? (
                  <Locations />
                ) : (
                  <Portal />
                )
              }
            />
            <Route
              path="/employees"
              element={
                manager.email && manager.isAdmin ? (
                  <Employees />
                ) : manager.email ? (
                  <Locations />
                ) : (
                  <Portal />
                )
              }
            />
            <Route
              path="/products"
              element={
                // <div className="contentCss">
                manager.email ? <Products /> : <Portal />
                // </div>
              }
            />
            <Route
              path="/locations"
              element={manager.email ? <Locations /> : <Portal />}
            />
            {/* <Route path="/promotions" element={<Promotions />} /> */}
            <Route
              path="/profileAdmin"
              element={
                manager.email && manager.isAdmin ? (
                  <ProfileAdmin />
                ) : manager.email ? (
                  <ProfileManager />
                ) : (
                  <Portal />
                )
              }
            />
            <Route
              path="/profileManager"
              element={
                manager.email && !manager.isAdmin ? (
                  <ProfileManager />
                ) : manager.isAdmin ? (
                  <ProfileAdmin />
                ) : (
                  <Portal />
                )
              }
            />

            <Route
              path="/listOfManagers"
              element={
                manager.email && manager.isAdmin ? (
                  <Management />
                ) : manager.email ? (
                  <ListContact />
                ) : (
                  <Portal />
                )
              }
            />
            <Route
              path="/listOfManagersForManager"
              element={
                manager.email && !manager.isAdmin ? (
                  <ListContact />
                ) : manager.email ? (
                  <Management />
                ) : (
                  <Portal />
                )
              }
            />
            <Route
              path="/promotions/carousel"
              element={manager.email ? <Carousel /> : <Portal />}
            />
            <Route
              path="/promotions/nocarousel"
              element={manager.email ? <Nocarousel /> : <Portal />}
            />
            <Route
              path="/admin/laws"
              element={
                manager.email && manager.isAdmin ? (
                  <Law />
                ) : manager.email ? (
                  <Locations />
                ) : (
                  <Portal />
                )
              }
            />

            <Route path="/registration/success" element={<Success />} />

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
    </>
  );
};

export default Navigation;

// return (
//   <div className="wrapperCss">
//     <Routes>
//       <Route path="/" element={<Navbar />}>
//         <Route path="/portal" element={<Portal />} />
//         <Route path="/clients" element={<Clients />} />
//         <Route path="/employees" element={<Employees />} />
//         <Route
//           path="/products"
//           element={
//             // <div className="contentCss">
//             <Products />
//             // </div>
//           }
//         />
//         <Route path="/locations" element={<Locations />} />
//         {/* <Route path="/promotions" element={<Promotions />} /> */}
//         <Route path="/profileAdmin" element={<ProfileAdmin />} />
//         <Route path="/profileManager" element={<ProfileManager />} />
//         <Route path="/listOfManagers" element={<Management />} />
//         <Route path="/listOfManagersForManager" element={<ListContact />} />
//         <Route path="/promotions/carousel" element={<Carousel />} />
//         <Route path="/promotions/nocarousel" element={<Nocarousel />} />
//         <Route path="/registration/success" element={<Success />} />
//         <Route path="/admin/laws" element={<Law />} />
//         <Route path="*" element={<NotFound />} />
//         <Route />
//       </Route>
//       {/*
//         //!не трогать
//       <Route path="/portal" element={<Portal />} /> */}
//     </Routes>
//     <Footer />
//     {/* <div className="footerCss"> */}
//     {/* </div> */}

//     {/* <Route path="/footer" element={<Footer />} /> */}
//   </div>
// );
// };

// export default Navigation;
