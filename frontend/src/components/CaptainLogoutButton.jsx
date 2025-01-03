import { LogOut, SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CaptainLogoutButton = ({ setRidePopUpPanelOpen, ridePopUpPanelOpen }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/captain/logout");
  };

  return (
    <div className="absolute top-6 right-6 z-[1002] flex gap-4">
      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        aria-label="Logout"
        className="bg-white hover:bg-gray-200 p-3 rounded-full shadow-md transition-all duration-200 ease-in-out"
      >
        <LogOut className="text-black h-6 w-6" />
      </button>

      {/* Ride Pop-Up Toggle */}
      <button
        onClick={() => setRidePopUpPanelOpen(!ridePopUpPanelOpen)}
        aria-label={
          ridePopUpPanelOpen ? "Close Ride Pop-Up" : "Open Ride Pop-Up"
        }
        className={`p-3 rounded-full shadow-md transition-all duration-200 ease-in-out ${
          ridePopUpPanelOpen
            ? "bg-green-100 hover:bg-green-200"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        <SquarePlus className="text-black h-6 w-6" />
      </button>
    </div>
  );
};

CaptainLogoutButton.propTypes = {
  setRidePopUpPanelOpen: PropTypes.func.isRequired,
  ridePopUpPanelOpen: PropTypes.bool.isRequired,
};

export default CaptainLogoutButton;
