import { memo } from "react";
import PropTypes from "prop-types";
import { ChevronDown, User } from "lucide-react";

const RIDES_DATA = [
  {
    id: "moto",
    name: "Moto",
    imageSrc:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    capacity: 1,
    eta: 10,
    price: 20,
  },
  {
    id: "auto",
    name: "Auto",
    imageSrc:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    capacity: 3,
    eta: 8,
    price: 30,
  },
  {
    id: "car",
    name: "Car",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s",
    capacity: 4,
    eta: 12,
    price: 40,
  },
];

const RideCard = memo(({ ride, onSelect }) => (
  <button
    className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 
               sm:gap-2 font-semibold text-md border-2 px-4 py-3 rounded-3xl
               hover:border-gray-400 transition-colors cursor-pointer"
    onClick={onSelect}
  >
    <div className="relative h-20 w-20 sm:h-24 sm:w-32">
      <img
        src={ride.imageSrc}
        alt={`${ride.name} vehicle`}
        className="h-full w-full object-cover rounded-lg"
        loading="lazy"
      />
    </div>

    <div
      className="flex flex-col items-center sm:items-start justify-center 
                    flex-grow text-center sm:text-left space-y-1"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">{ride.name}</span>
        <div className="flex items-center gap-1 text-gray-600">
          <User size={16} />
          <span>{ride.capacity}</span>
        </div>
      </div>
      <span className="text-gray-400 text-sm">{ride.eta} mins away</span>
    </div>

    <div className="w-full sm:w-auto text-center sm:text-right">
      <span className="text-lg sm:text-xl font-bold">${ride.price}</span>
    </div>
  </button>
));

RideCard.propTypes = {
  ride: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    eta: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

RideCard.displayName = "RideCard";

const AvailableRidesPanel = ({
  setRideTypePannelOpen,
  closeRideTypePannelRef,
  setConfirmRidePannel,
  rides = RIDES_DATA,
}) => {
  const handleRideSelect = () => {
    setConfirmRidePannel(true);
  };

  const handleClose = () => {
    setRideTypePannelOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-start px-3 py-5 max-w-2xl mx-auto">
      <button
        ref={closeRideTypePannelRef}
        className="opacity-0  p-2"
        onClick={handleClose}
        aria-label="Close panel"
      >
        <ChevronDown size={28} />
      </button>

      <h2 className="font-bold text-2xl sm:text-3xl my-3 w-full text-center">
        Available Rides
      </h2>

      <div className="w-full space-y-4">
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} onSelect={handleRideSelect} />
        ))}
      </div>
    </div>
  );
};

AvailableRidesPanel.propTypes = {
  setRideTypePannelOpen: PropTypes.func.isRequired,
  closeRideTypePannelRef: PropTypes.object.isRequired,
  setConfirmRidePannel: PropTypes.func.isRequired,
  rides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
      eta: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

export default memo(AvailableRidesPanel);
