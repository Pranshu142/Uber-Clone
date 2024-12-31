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
    <div className="absolute top-10 right-10 z-[1002] bg-white rounded-full p-3 cursor-pointer">
      <LogOut
        color="#000000"
        absoluteStrokeWidth
        onClick={() => logoutHandler()}
      />
      <SquarePlus
        color="#000000"
        absoluteStrokeWidth
        className=" bg-white absolute top-26 right-4 z-[1001]"
        onClick={() => {
          if (ridePopUpPanelOpen) {
            setRidePopUpPanelOpen(false);
          } else {
            setRidePopUpPanelOpen(true);
          }
        }}
      />
    </div>
  );
};
CaptainLogoutButton.propTypes = {
  setRidePopUpPanelOpen: PropTypes.func.isRequired,
  ridePopUpPanelOpen: PropTypes.bool.isRequired,
};

export default CaptainLogoutButton;
