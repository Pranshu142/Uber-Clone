import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import { MapPin } from "lucide-react";

const LocationItem = memo(({ location, onSelect }) => {
  const { description } = location;

  const handleSelect = useCallback(() => {
    onSelect(description);
  }, [description, onSelect]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        onSelect(description);
      }
    },
    [description, onSelect]
  );

  return (
    <div
      className="w-full flex items-center gap-2 md:gap-3
                py-2 md:py-3 bg-gray-100 hover:bg-gray-200
                border-black active:border-2 rounded-lg
                px-3 md:px-4 transition-colors duration-200
                cursor-pointer"
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <MapPin className="text-gray-500 flex-shrink-0" aria-hidden="true" />
      <div className="flex flex-col w-[90%]">
        <span className="text-sm md:text-base lg:text-lg font-medium truncate">
          {description}
        </span>
      </div>
    </div>
  );
});

LocationItem.displayName = "LocationItem";

LocationItem.propTypes = {
  location: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const LocationSearchPanel = ({
  suggestions,
  setStartPoint,
  setEndPoint,
  activeInput,
}) => {
  const handleLocationSelect = (description) => {
    if (activeInput === "endPoint") {
      setEndPoint(description);
    } else {
      setStartPoint(description);
    }
  };

  return (
    <div
      className="flex flex-col gap-3 md:gap-5 p-2 md:p-4"
      role="listbox"
      aria-label="Select a location"
    >
      {suggestions.map((location) => (
        <LocationItem
          key={location.place_id}
          location={location}
          onSelect={handleLocationSelect}
        />
      ))}
    </div>
  );
};

LocationSearchPanel.propTypes = {
  setStartPoint: PropTypes.func.isRequired,
  setEndPoint: PropTypes.func.isRequired,
  activeInput: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      place_id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default memo(LocationSearchPanel);
