import PropTypes from "prop-types";
import { memo } from "react";

const LOCATIONS = [
  {
    id: "loc1",
    address: "221B Baker Street",
    city: "Mumbai",
    state: "Maharashtra",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc2",
    address: "10 Downing Street",
    city: "New Delhi",
    state: "Delhi",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc3",
    address: "1600 Amphitheatre Parkway",
    city: "Bengaluru",
    state: "Karnataka",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc4",
    address: "742 Evergreen Terrace",
    city: "Chennai",
    state: "Tamil Nadu",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc5",
    address: "4 Privet Drive",
    city: "Kolkata",
    state: "West Bengal",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc6",
    address: "12 Grimmauld Place",
    city: "Hyderabad",
    state: "Telangana",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc7",
    address: "1313 Mockingbird Lane",
    city: "Pune",
    state: "Maharashtra",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc8",
    address: "42 Wallaby Way",
    city: "Ahmedabad",
    state: "Gujarat",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc9",
    address: "123 Sesame Street",
    city: "Jaipur",
    state: "Rajasthan",
    icon: "ri-map-pin-fill",
  },
  {
    id: "loc10",
    address: "555 California Street",
    city: "Lucknow",
    state: "Uttar Pradesh",
    icon: "ri-map-pin-fill",
  },
];

const LocationItem = memo(({ location, onSelect }) => {
  const { address, city, state, icon } = location;

  return (
    <div
      className="w-full flex items-center gap-2 md:gap-3 
                py-2 md:py-3 bg-gray-100 hover:bg-gray-200 
                border-black active:border-2 rounded-lg 
                px-2 md:px-4 transition-colors duration-200 
                cursor-pointer"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect();
        }
      }}
    >
      <i
        className={`${icon} bg-gray-300 rounded-lg 
                  px-1.5 md:px-2 py-1 md:py-1.5 
                  text-base md:text-lg`}
        aria-hidden="true"
      />
      <div className="flex flex-col">
        <span className="text-sm md:text-base lg:text-lg font-medium truncate">
          {address}
        </span>
        <span className="text-xs md:text-sm text-gray-600 truncate">
          {city}, {state}
        </span>
      </div>
    </div>
  );
});

LocationItem.displayName = "LocationItem";

LocationItem.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const LocationSearchPanel = ({ setPannelOpen, setRideTypePannelOpen }) => {
  const handleLocationSelect = () => {
    setPannelOpen(false);

    setRideTypePannelOpen(true);
  };

  return (
    <div
      className="flex flex-col gap-3 md:gap-5 p-2 md:p-4"
      role="listbox"
      aria-label="Select a location"
    >
      {LOCATIONS.map((location) => (
        <LocationItem
          key={location.id}
          location={location}
          onSelect={() => handleLocationSelect()}
        />
      ))}
    </div>
  );
};

LocationSearchPanel.propTypes = {
  setPannelOpen: PropTypes.func.isRequired,
  setRideTypePannelOpen: PropTypes.func.isRequired,
};

export default memo(LocationSearchPanel);
