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
import { useAppSelector } from '../Redux/hooks';
import Law from '../components/Admin/Laws/Laws';
import LoadingAnimation from '../components/Loading/Loading';
import Questions from '../components/Admin/Questions/Questions';
import EmailSuccess from '../components/Success/EmailSucces';
import NotFound from '../components/Errors/404/NotFound';
import Activate500 from '../components/Errors/OldLink/Activate500';
import ErrorEmail500 from '../components/Errors/ErrorEmail/ErrorEmail500';

const Navigation: FC = () => {
  const manager = useAppSelector((state) => state.managerSlice.manager);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToLocations = () => {
      navigate('/locations');
      setLoading(false);
    };

    const SuccessPage =
      location.pathname.includes('/registration/success') ||
      location.pathname.includes('/email/success') ||
      location.pathname.includes('/email/unsuccess') ||
      location.pathname.includes('/registration/unsuccess');
    if (
      !SuccessPage &&
      manager.email &&
      window.location.pathname.includes('/portal')
    ) {
      setLoading(true);
      setTimeout(navigateToLocations, 1000);
    } else if (!manager.email && !SuccessPage) {
      navigate('/portal');
    }
  }, [manager.email, navigate]);

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
              path="/questions"
              element={manager.email ? <Questions /> : <Portal />}
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
            <Route path="/registration/unsuccess" element={<Activate500 />} />
            <Route path="/email/unsuccess" element={<ErrorEmail500 />} />
            <Route path="/email/success" element={<EmailSuccess />} />
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
