// import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import RiderLogin from "./pages/RiderLogin.jsx";
import RiderSignup from "./pages/RiderSignup.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import RiderHome from "./pages/RiderHome.jsx";
// this import is used to protect the routes for the rider home page and the ride start page from unauthorized access
import RiderProtectedRoutes from "./pages/RiderProtectedRoutes.jsx";
import RiderLogout from "./pages/RiderLogout.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
// this import is used to protect the routes for the captain home page and the ride start page from unauthorized access
import CaptainProtectedRoutes from "./pages/CaptainProtectedRoutes.jsx";
import RideStart from "./pages/RideStart.jsx";
import CaptainRidingStart from "./pages/CaptainRidingStart.jsx";

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
        <Route path="/captain-riding" element={<CaptainRidingStart />} />
        <Route path="/captain/logout" element={<CaptainLogout />} />
      </Routes>
    </div>
  );
};

export default App;
