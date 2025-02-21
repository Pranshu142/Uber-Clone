import { Coins, MapPin, MapPinOff } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
/**
 * A component that displays a ride confirmation panel for the captain/driver
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.setRidePopUpPanelOpen - Function to control the visibility of ride popup panel
 * @param {Function} props.setCaptainConfirmRidePanelOpen - Function to control the visibility of captain confirmation panel
 * @param {Object} props.ride - The ride object containing ride details
 * @param {string} props.ride._id - Unique identifier for the ride
 * @param {Object} props.ride.rider - Object containing rider information
 * @param {Object} props.ride.rider.fullname - Object containing rider's name details
 * @param {string} props.ride.rider.fullname.firstname - Rider's first name
 * @param {number} props.ride.distance - Distance of the ride in kilometers
 * @param {string} props.ride.startLocation - Pickup location
 * @param {string} props.ride.endLocation - Drop-off location
 * @param {number} props.ride.fare - Fare amount for the ride
 * @returns {JSX.Element} A form containing ride details and OTP verification
 */
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
      // an api call is required to verify the otp and start the ride with the rideId in the session  and the otp
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
      // checking for the response and  if the status is 200 then the ride is started and the captain is redirected to the captain-riding page
      if (response.status === 200) {
        navigate("/captain-riding", { state: { ride: response.data } });
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
        {/* Heading of the componet goes here   */}
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
                {/* name of the driver goes here {first name } */}
                {ride ? ride.rider.fullname.firstname : "rider name"}
              </span>
            </h3>
          </div>
        </div>
        <div>
          <h3 className="w-full text-end text-lg ">
            {/* total distance travelled by the cpatain goes here */}
            {ride ? ride.distance : "distance"} Km
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <MapPin className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">
          {/* pickup point address selected by the rider goes here */}
          {ride ? ride.startLocation : "Pickup Point"}
        </h3>
      </div>
      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <MapPinOff className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">
          {/* drop point address selected by the rider goes here */}
          {ride ? ride.endLocation : "Drop Point"}
        </h3>
      </div>
      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <Coins className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">
          {/* fare for the ride goes here */}
          {ride ? ride.fare : "100"}
        </h3>
      </div>
      <form className="w-full" onSubmit={verifyOtpAndStartRide}>
        {/* enter the otp given by the rider */}
        <input
          className="w-full border-2 rounded-lg px-8 md:px-10 py-3 md:py-4 text-base md:text-lg bg-gray-200"
          type="text"
          placeholder="Enter your OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="container-4 flex items-center justify-between ">
          {/* button to submit the otp to the backend end point to verify and start ride if validated sucessfully */}
          <button
            to={"/captain-riding"}
            className="bg-green-300 px-5 py-4 rounded-full mt-5 text-xl sm:text-2xl font-semibold active:border-2 active:border-black transition-all duration-200"
          >
            Confirm Ride
          </button>
          {/* button to change the UI by closing the confirm ride pannel */}
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

// pops validation messages
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
