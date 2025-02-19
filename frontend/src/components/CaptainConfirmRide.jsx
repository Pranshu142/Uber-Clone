import { Coins, MapPin, MapPinOff } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
const CaptainConfirmRide = ({
  setRidePopUpPanelOpen,
  setCaptainConfirmRidePanelOpen,
  ride,
}) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const verifyOtpAndStartRide = async (e) => {
    // verify otp and start ride
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/ride-started`,
        null,
        {
          params: {
            rideId: ride._id,
            otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/captain-riding", { status: { ride: response.data } });
        setRidePopUpPanelOpen(false);
        setCaptainConfirmRidePanelOpen(false);
      }
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };
  return (
    <>
      <div className="container-1 flex justify-start  items-center w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-center sm:text-left">
          Confirm your ride
        </h2>
      </div>
      <div className="container-2 w-full flex justify-between items-center  px-3">
        <div className="sub-container-2 flex gap-5 items-center">
          <div>
            <img
              src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
              className="h-20 w-20 object-center object-cover rounded-full"
            ></img>
          </div>
          <div>
            <h3>
              <span className="text-lg ">
                {ride ? ride.rider.fullname.firstname : "rider name"}
              </span>
            </h3>
          </div>
        </div>
        <div>
          <h3 className="w-full text-end text-lg ">
            {ride ? ride.distance : "distance"} Km
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <MapPin className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">
          {ride ? ride.startLocation : "Pickup Point"}
        </h3>
      </div>
      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <MapPinOff className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">
          {ride ? ride.endLocation : "Drop Point"}
        </h3>
      </div>
      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <Coins className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">
          {ride ? ride.fare : "100"}
        </h3>
      </div>
      <form className="w-full" onSubmit={verifyOtpAndStartRide}>
        <input
          className="w-full border-2 rounded-lg px-8 md:px-10 py-3 md:py-4 text-base md:text-lg bg-gray-200"
          type="text"
          placeholder="Enter your OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="container-4 flex items-center justify-between ">
          <button
            to={"/captain-riding"}
            className="bg-green-300 px-5 py-4 rounded-full mt-5 text-xl sm:text-2xl font-semibold active:border-2 active:border-black transition-all duration-200"
          >
            Confirm Ride
          </button>
          <button
            type="button"
            className="bg-orange-300 px-5 py-4 rounded-full mt-5 text-xl sm:text-2xl font-semibold active:border-2 active:border-black transition-all duration-200"
            onClick={() => {
              setRidePopUpPanelOpen(false);
              setCaptainConfirmRidePanelOpen(false);
            }}
          >
            Cancel Ride
          </button>
        </div>
      </form>
    </>
  );
};
CaptainConfirmRide.propTypes = {
  setRidePopUpPanelOpen: PropTypes.func.isRequired,
  setCaptainConfirmRidePanelOpen: PropTypes.func.isRequired,
  ride: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    rider: PropTypes.shape({
      fullname: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    distance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    startLocation: PropTypes.string,
    endLocation: PropTypes.string,
    fare: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default CaptainConfirmRide;
