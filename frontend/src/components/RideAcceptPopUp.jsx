import { ChevronDown, Coins, MapPin, MapPinOff } from "lucide-react";
import PropTypes from "prop-types";

const RideAcceptPopUp = ({
  setRidePopUpPanelOpen,
  setCaptainConfirmRidePanelOpen,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 min-w-[300px]">
      {/* Header */}
      <div className="container-1 flex justify-between items-center w-full">
        <ChevronDown
          className="h-7 w-7 cursor-pointer text-gray-500"
          aria-label="Collapse"
          onClick={() => setRidePopUpPanelOpen(false)}
        />
        <h2 className="text-2xl sm:text-3xl font-bold">New Ride Available!</h2>
      </div>

      {/* Rider Information */}
      <div className=" container-2 flex justify-between items-center px-3">
        <div className=" sub-container-2 flex items-center gap-4">
          <img
            src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
            alt="Rider"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-medium">Rider Name</h3>
            <p className="text-sm text-gray-500">5 mins away</p>
          </div>
        </div>
        <p className="text-lg font-semibold">2.5 km</p>
      </div>

      {/* Ride Details */}
      <div className=" container-3 flex flex-col gap-3">
        <RideDetail icon={<MapPin />} label="Pickup Location" />
        <RideDetail icon={<MapPinOff />} label="Drop Location" />
        <RideDetail icon={<Coins />} label="₹60" />
      </div>

      {/* Action Buttons */}
      <div className="container-4 flex justify-between w-full mt-4">
        <button
          className="bg-black text-white px-5 py-3 rounded-full text-lg font-semibold transition-transform transform active:scale-95"
          onClick={() => setCaptainConfirmRidePanelOpen(true)}
        >
          Accept Ride
        </button>
        <button
          className="bg-gray-200 text-black px-5 py-3 rounded-full text-lg font-semibold transition-transform transform active:scale-95"
          onClick={() => setRidePopUpPanelOpen(false)}
        >
          Cancel Ride
        </button>
      </div>
      <style>{`
          @media (max-width: 340px) {
            .container-1 {
            flex-direction: column;
              justify-content: center;
              margin-bottom: 10px;
            }
            .sub-container-1 {
              justify-content: center;
              item-align: center;
            }
            .container-2 {
            flex-direction: column;
              justify-content: center;
              item-align: center;
            }
            .sub-container-2{
              justify-content: center;
              flex-direction: column;
              item-align: center;
            }
            .container-4 {
            flex-direction: column;
              item-align: center;
              justify-content: center;
              gap: 10px;
            }
          }
          }
        `}</style>
    </div>
  );
};

const RideDetail = ({ icon, label }) => (
  <div className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl transition-colors">
    <span className="h-6 w-6 text-gray-700">{icon}</span>
    <p className="text-md sm:text-lg font-medium">{label}</p>
  </div>
);

RideDetail.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

RideAcceptPopUp.propTypes = {
  setCaptainConfirmRidePanelOpen: PropTypes.func.isRequired,
  setRidePopUpPanelOpen: PropTypes.func.isRequired,
};

export default RideAcceptPopUp;
