import { MapPin, Coins } from "lucide-react";
// import { useState } from "react";
import Rings from "react-loading-icons/dist/esm/components/rings";

import RiderLogoutButton from "../components/RiderLogoutButton";
import LiveTracking from "../components/LiveTracking.jsx";

const RideStart = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Uber Logo */}
      <img
        className="w-14 ml-5 sm:ml-12 mb-5 absolute top-5 sm:top-8 z-[900]"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber logo"
      />
      <RiderLogoutButton className="absolute top-0 right-0" />

      {/* Map */}
      <LiveTracking />

      {/* Ride Info Panel */}
      <div className="flex flex-col items-start gap-5 px-4 py-5 absolute bottom-0 h-[60vh] md:h-[50vh] z-[1001] w-full bg-white shadow-lg shadow-gray-300 overflow-y-auto rounded-t-3xl">
        {/* Ride Status */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg sm:text-2xl font-bold">Ride has started...</h3>
          <Rings
            stroke="green"
            strokeOpacity={0.4}
            speed={0.7}
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          />
        </div>

        {/* Vehicle Image */}
        <div className="w-full flex justify-center items-center py-4 rounded-2xl bg-gray-100 shadow-md">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/048/600/735/small/modern-car-isolated-on-background-3d-rendering-illustration-png.png"
            alt="Vehicle"
            className="object-cover object-center h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32"
          />
        </div>

        {/* Ride Details */}
        <div className="flex flex-col w-full gap-4">
          {/* Pickup Location */}
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-3 sm:py-4 md:py-5 active:border-2 active:border-black w-full text-left">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-xs sm:text-sm md:text-lg font-semibold">
              1600 Amphitheatre Parkway, Bengaluru, Karnataka
            </h3>
          </button>

          {/* Fare Details */}
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-3 sm:py-4 md:py-5 active:border-2 active:border-black w-full text-left">
            <Coins className="h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-xs sm:text-sm md:text-lg font-semibold">₹60</h3>
          </button>

          {/* Payment Button */}
          <button className="bg-green-400 hover:bg-green-500 px-3 py-3 sm:py-4 md:py-5 w-full rounded-full text-sm sm:text-lg md:text-2xl font-bold active:border-2 active:border-black transition-all duration-200">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideStart;
