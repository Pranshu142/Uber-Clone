import { memo } from "react";
import PropTypes from "prop-types";
import { Coins, MapPin, MapPinOff, ChevronDown } from "lucide-react";

const LocationButton = memo(({ icon: Icon, address }) => (
  <button className="flex items-center gap-3 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
    <Icon className="h-6 w-6 text-gray-700 flex-shrink-0" />
    <h3 className="text-md sm:text-lg font-semibold line-clamp-2">{address}</h3>
  </button>
));

LocationButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  address: PropTypes.string.isRequired,
};

LocationButton.displayName = "LocationButton";

const ConfirmRidePanel = ({
  setLookingForCaptainPannel,
  closeConfirmRidePannelRef,
  setConfirmRidePannel,
  pickupAddress = "1600 Amphitheatre Parkway, Bengaluru, Karnataka",
  dropAddress = "1600 Amphitheatre Parkway, Bengaluru, Karnataka",
  fare = 60,
  imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&",
}) => {
  const handleConfirmRide = () => {
    setLookingForCaptainPannel(true);
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
          src={imageSrc}
          alt="Ride Vehicle"
          className="h-28 w-28 sm:h-36 sm:w-32 object-center object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col w-full gap-4">
        <LocationButton icon={MapPinOff} address={pickupAddress} />
        <LocationButton icon={MapPin} address={dropAddress} />

        <button className="flex items-center gap-3 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
          <Coins className="h-6 w-6 text-gray-700 flex-shrink-0" />
          <h3 className="text-md sm:text-lg font-semibold">₹{fare}</h3>
        </button>
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
  pickupAddress: PropTypes.string,
  dropAddress: PropTypes.string,
  fare: PropTypes.number,
  imageSrc: PropTypes.string,
};

export default memo(ConfirmRidePanel);
