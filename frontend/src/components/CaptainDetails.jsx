import { Clock, Gauge, NotepadTextDashed } from "lucide-react";

const CaptainDetails = () => {
  return (
    <>
      <div className="w-full px-4 py-5 h-full flex flex-col gap-6 overflow-y-auto">
        {/* Driver Info */}
        <div className=" top-container flex flex-wrap  justify-between items-center">
          <div className="sub-container-1 flex flex-wrap gap-4 items-center">
            <img
              src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
              alt="Driver Profile"
              className="h-20 w-20 object-cover rounded-full shadow-md"
            />
            <div>
              <h3 className="text-lg font-semibold">Driver Name</h3>
              <p className="text-sm text-gray-500">Driver Level</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold ">₹60</h3>
            <p className="text-sm text-gray-500">Earned</p>
          </div>
        </div>

        {/* Metrics Section */}
        <div className=" sub-container-2 flex flex-wrap justify-between items-center w-full px-4 py-6 rounded-xl border border-gray-300 shadow-lg bg-gray-100 gap-6 sm:gap-3">
          {/* Online Time */}
          <div className="flex flex-col items-center flex-1 sm:w-auto">
            <Clock className="h-8 w-8 text-gray-600" />
            <h3 className="text-xl font-bold mt-2">10h</h3>
            <p className="text-sm text-gray-500 text-center">Time Online</p>
          </div>

          {/* Distance Traveled */}
          <div className="flex flex-col items-center flex-1 sm:w-auto">
            <Gauge className="h-8 w-8 text-gray-600" />
            <h3 className="text-xl font-bold mt-2">30 Km</h3>
            <p className="text-sm text-gray-500 text-center">
              Distance Traveled
            </p>
          </div>

          {/* Completed Rides */}
          <div className="flex flex-col items-center flex-1 sm:w-auto">
            <NotepadTextDashed className="h-8 w-8 text-gray-600" />
            <h3 className="text-xl font-bold mt-2">20</h3>
            <p className="text-sm text-gray-500 text-center">Rides Completed</p>
          </div>
        </div>
        <style>{`
          @media (max-width: 340px) {
            .top-container {
              justify-content: center;
            }
            .sub-container-1 {
              justify-content: center;
            }
            .sub-container-2 {
            flex-direction: column;
              justify-content: center;
            }
          }
          }
        `}</style>
      </div>
    </>
  );
};

export default CaptainDetails;
