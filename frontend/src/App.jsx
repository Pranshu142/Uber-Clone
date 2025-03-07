// import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage.jsx";
import CaptainLogin from "./pages/Captain Pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/Captain Pages/CaptainSignup.jsx";
import RiderLogin from "./pages/Rider Pages/RiderLogin.jsx";
import RiderSignup from "./pages/Rider Pages/RiderSignup.jsx";
import CaptainHome from "./pages/Captain Pages/CaptainHome.jsx";
import RiderHome from "./pages/Rider Pages/RiderHome.jsx";
// this import is used to protect the routes for the rider home page and the ride start page from unauthorized access
import RiderProtectedRoutes from "./pages/Rider Pages/RiderProtectedRoutes.jsx";
import RiderLogout from "./pages/Rider Pages/RiderLogout.jsx";
import CaptainLogout from "./pages/Captain Pages/CaptainLogout.jsx";
// this import is used to protect the routes for the captain home page and the ride start page from unauthorized access
import CaptainProtectedRoutes from "./pages/Captain Pages/CaptainProtectedRoutes.jsx";
import RideStart from "./pages/Rider Pages/RideStart.jsx";
import CaptainRidingStart from "./pages/Captain Pages/CaptainRidingStart.jsx";
import RiderProfile from "./pages/Rider Pages/RiderProfile.jsx";
import CaptainProfile from "./pages/Captain Pages/CaptainProfile.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<RiderSignup />} />
        <Route path="/login" element={<RiderLogin />} />
        {/* RiderProtectedRoutes is a higher order component that protects the routes for the rider home page and the ride start page from unauthorized access */}
        <Route
          path="/rider-home"
          element={
            <RiderProtectedRoutes>
              <RiderHome />
            </RiderProtectedRoutes>
          }
        />
        <Route
          path="/rider-profile"
          element={
            <RiderProtectedRoutes>
              <RiderProfile />
            </RiderProtectedRoutes>
          }
        />
        {/* RiderProtectedRoutes is a higher order component that protects the routes for the rider home page and the ride start page from unauthorized access */}
        <Route
          path="/riding"
          element={
            <RiderProtectedRoutes>
              <RideStart />
            </RiderProtectedRoutes>
          }
        />
        <Route path="/rider/logout" element={<RiderLogout />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        {/* CaptainProtectedRoutes is a higher order component that protects the routes for the captain home page and the ride start page from unauthorized access */}
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedRoutes>
              <CaptainHome />
            </CaptainProtectedRoutes>
          }
        />
        <Route
          path="/captain-profile"
          element={
            <RiderProtectedRoutes>
              <CaptainProfile />
            </RiderProtectedRoutes>
          }
        />
        <Route path="/captain-riding" element={<CaptainRidingStart />} />
        <Route path="/captain/logout" element={<CaptainLogout />} />
      </Routes>
    </div>
  );
};

export default App;
