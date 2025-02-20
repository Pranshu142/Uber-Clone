import { memo } from "react";
import PropTypes from "prop-types";
import { Coins, MapPin, MapPinOff, ChevronDown } from "lucide-react";
import axios from "axios";

const LocationInfo = ({ icon: Icon, address }) => (
  <div className="flex items-center gap-3 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
    <Icon className="h-6 w-6 text-gray-700 flex-shrink-0" />
    <h3 className="text-md sm:text-lg font-semibold line-clamp-2">{address}</h3>
  </div>
);

LocationInfo.propTypes = {
  icon: PropTypes.elementType.isRequired,
  address: PropTypes.string.isRequired,
};

LocationInfo.displayName = "LocationInfo";

const ConfirmRidePanel = ({
  setLookingForCaptainPannel,
  closeConfirmRidePannelRef,
  setConfirmRidePannel,
  startPoint,
  endPoint,
  confirmRideImage,
  fare,
  vehicleType,
}) => {
  const handleConfirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create-ride`,
        {
          origin: startPoint,
          destination: endPoint,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setLookingForCaptainPannel(true);
      }
    } catch (error) {
      console.error("Ride creation failed:", error);
    }
  };

  const handleClose = () => {
    setConfirmRidePannel(false);
  };

  return (
    <div className="flex flex-col justify-start px-4 py-5 gap-5 max-w-2xl mx-auto">
      <ChevronDown
        ref={closeConfirmRidePannelRef}
        className="h-7 w-10 opacity-0 cursor-pointer hover:opacity-100 transition-opacity"
        onClick={handleClose}
      />

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-center sm:text-left">
          Confirm your ride
        </h2>
      </div>

      <div
        className="flex justify-center items-center mt-3 bg-gray-100 rounded-2xl py-3 shadow-sm shadow-gray-400 mb-5"
        role="img"
        aria-label="Vehicle preview"
      >
        <img
          src={confirmRideImage}
          alt="Ride Vehicle"
          className="h-28 w-28 sm:h-36 sm:w-32 object-center object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col w-full gap-4">
        <LocationInfo icon={MapPinOff} address={startPoint} />
        <LocationInfo icon={MapPin} address={endPoint} />

        <div className="flex items-center gap-3 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
          <Coins className="h-6 w-6 text-gray-700 flex-shrink-0" />
          <h3 className="text-md sm:text-lg font-semibold">₹{fare}</h3>
        </div>
      </div>

      <button
        className="bg-green-500 hover:bg-green-600 px-3 py-4 w-full rounded-full mt-5 text-xl sm:text-2xl font-bold active:border-2 active:border-black transition-all duration-200"
        onClick={handleConfirmRide}
      >
        Confirm Ride
      </button>
    </div>
  );
};

ConfirmRidePanel.propTypes = {
  setLookingForCaptainPannel: PropTypes.func.isRequired,
  setConfirmRidePannel: PropTypes.func.isRequired,
  closeConfirmRidePannelRef: PropTypes.object.isRequired,
  startPoint: PropTypes.string.isRequired,
  endPoint: PropTypes.string.isRequired,
  confirmRideImage: PropTypes.string.isRequired,
  vehicleType: PropTypes.string.isRequired,
  pickupAddress: PropTypes.string,
  dropAddress: PropTypes.string,
  fare: PropTypes.number,
  imageSrc: PropTypes.string,
};

export default memo(ConfirmRidePanel);
