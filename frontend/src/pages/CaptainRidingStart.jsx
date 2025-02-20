import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import CaptainLogoutButton from "../components/CaptainLogoutButton";
import LiveTracking from "../components/LiveTracking";

import { Coins, MapPin, MapPinOff } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * CaptainRidingStart Component
 *
 * A React component that represents the captain's ride-in-progress view.
 * Features a live tracking display and two panels:
 * 1. Ride Started Panel - Shows ride status and complete ride button
 * 2. Complete Ride Panel - Shows ride details and finish options
 *
 * Uses GSAP animations for panel transitions and manages panel visibility state.
 *
 * @component
 * @example
 * return (
 *   <CaptainRidingStart />
 * )
 *
 * @returns {JSX.Element} A component with ride tracking and control panels
 */
const CaptainRidingStart = () => {
  // Ref for the complete ride panel element
  const completeRideRef = useRef(null);
  // State to control complete ride panel visibility
  const [completeRidePanelOpen, setCompleteRidePanelOpen] = useState(false);

  // GSAP animation for sliding the complete ride panel
  useGSAP(() => {
    if (completeRidePanelOpen) {
      // Slide panel up when open
      gsap.to(completeRideRef.current, {
        transform: "translateY(0)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    } else {
      // Slide panel down when closed
      gsap.to(completeRideRef.current, {
        transform: "translateY(100%)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [completeRidePanelOpen]);

  return (
    <div className="h-screen w-screen relative">
      {/* Logout button container */}
      <div>
        <CaptainLogoutButton />
      </div>
      {/* Live tracking map component */}
      <LiveTracking />

      {/* Bottom panel showing ride status */}
      <div className="absolute bg-white h-1/5 z-[1001] w-full bottom-0 flex flex-col gap-3 items-center px-3 py-5 rounded-t-3xl border-2 border-gray-400 shadow-md sm:h-[25%]">
        <h3 className="text-xl font-bold sm:text-2xl">Ride has started...</h3>
        <button
          className="bg-green-500 px-4 py-3 sm:px-5 sm:py-4 rounded-full mt-4 text-lg sm:text-xl font-semibold"
          onClick={() => setCompleteRidePanelOpen(true)}
        >
          Complete Ride
        </button>
      </div>

      {/* Sliding panel for ride completion */}
      <div
        ref={completeRideRef}
        className="fixed w-full bottom-0 translate-y-full z-[1002] bg-white rounded-t-3xl shadow-lg flex flex-col gap-6 items-center px-3 py-4 sm:gap-10 sm:px-6 sm:py-5 border-2 border-gray-400"
      >
        {/* Panel header */}
        <div className="flex justify-center sm:justify-start items-center w-full">
          <h2 className="text-lg sm:text-2xl font-bold text-center">
            Finish your ride!!
          </h2>
        </div>

        {/* Rider info section */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <img
              src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
              className="h-16 w-16 sm:h-20 sm:w-20 object-center object-cover rounded-full"
            />
            <h3 className="text-sm sm:text-lg">Rider Name</h3>
          </div>
          <h3 className="text-sm sm:text-lg w-full text-center sm:text-end">
            Distance
          </h3>
        </div>

        {/* Ride details with icons */}
        {[
          { icon: <MapPin />, text: "Pickup Location" },
          { icon: <MapPinOff />, text: "Drop Location" },
          { icon: <Coins />, text: "₹60" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 sm:gap-6 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-3 sm:px-4 sm:py-4 active:border-2 active:border-black w-full text-left transition-colors"
          >
            {item.icon}
            <h3 className="text-sm sm:text-lg font-semibold">{item.text}</h3>
          </div>
        ))}

        {/* Navigation button to complete ride */}
        <Link
          to={"/captain-home"}
          className="bg-green-300 w-full px-4 py-3 sm:px-5 sm:py-4 rounded-full text-center text-lg sm:text-xl font-semibold active:border-2 active:border-black transition-all duration-200"
        >
          Finish Ride
        </Link>
      </div>
    </div>
  );
};

export default CaptainRidingStart;
