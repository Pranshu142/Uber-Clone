import { ChevronDown, Coins, MapPin, MapPinOff } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const CaptainConfirmRide = ({
  setRidePopUpPanelOpen,
  setCaptainConfirmRidePanelOpen,
}) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-center sm:text-left">
            Confirm your ride
          </h2>
        </div>
        <ChevronDown className="h-7 w-10 opacity-1 cursor-pointer " />
      </div>
      <div className="w-full flex justify-between items-center  px-3">
        <div className="flex gap-5 items-center">
          <div>
            <img
              src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
              className="h-20 w-20 object-center object-cover rounded-full"
            ></img>
          </div>
          <div>
            <h3>
              <span className="text-lg ">Rider Name</span>
            </h3>
          </div>
        </div>
        <div>
          <h3 className="w-full text-end text-lg ">Distance</h3>
        </div>
      </div>

      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <MapPin className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">Pickup Location</h3>
      </div>
      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <MapPinOff className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">Drop Location</h3>
      </div>
      <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
        <Coins className="h-6 w-6 text-gray-700 flex-shrink-0" />
        <h3 className="text-md sm:text-lg font-semibold">₹60</h3>
      </div>
      <form className="w-full">
        <input
          className="w-full border-2 rounded-lg px-8 md:px-10 py-3 md:py-4 text-base md:text-lg bg-gray-200"
          type="text"
          placeholder="Enter your OTP"
        />
        <div className="flex items-center justify-between ">
          <Link
            to={"/captain-riding"}
            className="bg-green-300  px-5 py-4 rounded-full mt-5 text-xl sm:text-2xl font-semibold active:border-2 active:border-black transition-all duration-200"
          >
            Confirm Ride
          </Link>
          <button
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
};

export default CaptainConfirmRide;
