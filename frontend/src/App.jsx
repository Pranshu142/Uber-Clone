// import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import RiderLogin from "./pages/RiderLogin.jsx";
import RiderSignup from "./pages/RiderSignup.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import RiderHome from "./pages/RiderHome.jsx";
import RiderProtectedRoutes from "./pages/RiderProtectedRoutes.jsx";
import RiderLogout from "./pages/RiderLogout.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
import CaptainProtectedRoutes from "./pages/CaptainProtectedRoutes.jsx";
import RideStart from "./pages/RideStart.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<RiderSignup />} />
        <Route path="/login" element={<RiderLogin />} />
        <Route
          path="/rider-home"
          element={
            <RiderProtectedRoutes>
              <RiderHome />
            </RiderProtectedRoutes>
          }
        />
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
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedRoutes>
              <CaptainHome />
            </CaptainProtectedRoutes>
          }
        />
        <Route path="/captain/logout" element={<CaptainLogout />} />
      </Routes>
    </div>
  );
};

export default App;
