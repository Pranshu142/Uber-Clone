import { useState, useEffect, useRef, useContext } from "react";
import LiveTracking from "../../components/LiveTracking.jsx";
import CaptainLogoutButton from "../../components/Captain Components/CaptainLogoutButton.jsx";
import CaptainDetails from "../../components/Captain Components/CaptainDetails.jsx";
import RideAcceptPopUp from "../../components/Captain Components/RideAcceptPopUp.jsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import CaptainConfirmRide from "../../components/Captain Components/CaptainConfirmRide.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
import { CaptainDataContext } from "../../context/CaptainContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

/**
 * CaptainHome component - Main interface for ride-share captains/drivers
 *
 * Handles real-time location tracking, ride request notifications, and ride confirmations.
 * Manages multiple animated panels for ride requests and confirmations using GSAP.
 * Integrates with WebSocket for real-time communication.
 *
 * @component
 * @requires react
 * @requires gsap
 * @requires axios
 * @requires SocketContext
 * @requires CaptainDataContext
 *
 * @example
 * return (
 *   <CaptainHome />
 * )
 *
 * State:
 * - ride: Current ride details
 * - ridePopUpPanelOpen: Controls ride request popup visibility
 * - CaptainConfirmRidePanelOpen: Controls ride confirmation panel visibility
 *
 * Effects:
 * - Initializes WebSocket connection
 * - Sets up continuous geolocation tracking
 * - Handles incoming ride requests
 * - Manages cleanup of location tracking and socket listeners
 *
 * @returns {JSX.Element} Captain's home interface with map, ride requests, and confirmation panels
 */

const CaptainHome = () => {
  // Refs for animation targets
  const ridePopUp = useRef(null);
  const CaptainConfirmRideRef = useRef(null);

  // State management
  const [CaptainConfirmRidePanelOpen, setCaptainConfirmRidePanelOpen] =
    useState(false);
  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(false);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();
  // Context hooks
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const profileButton = useRef(null);

  useEffect(() => {
    // Join socket room as captain
    socket.emit("join", {
      userType: "captain",
      userId: captain._id,
    });

    // Setup geolocation tracking
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        // Success callback - emit location updates
        (position) => {
          socket.emit("update-captain-location", {
            userId: captain._id,
            location: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          });
        },
        // Error callback
        (error) => {
          console.log(error);
          alert(`${Error(error.code)}: ${error.message}`);
        }
      );
      console.log(watchId);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    // Listen for incoming ride requests
    socket.on("ride-request", (data) => {
      const { ride } = data;
      setRide(ride);
      console.log(ride);
      setRidePopUpPanelOpen(true);
    });

    // Cleanup function
    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("ride-request");
      socket.off("join");
    };
  }, [captain, socket]);

  /**
   * Handle ride confirmation by captain
   * Makes API call to confirm ride and updates UI
   */
  const confirmRideButton = async () => {
    if (!ride) {
      console.error("No ride selected");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm-ride`,
        {
          rideId: ride._id,
          captain: captain,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    setCaptainConfirmRidePanelOpen(true);
  };

  // GSAP animation for ride popup panel
  useGSAP(() => {
    gsap.to(ridePopUp.current, {
      translateY: ridePopUpPanelOpen ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [ridePopUpPanelOpen]);

  // GSAP animation for ride confirmation panel
  useGSAP(() => {
    gsap.to(CaptainConfirmRideRef.current, {
      translateY: CaptainConfirmRidePanelOpen ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.inOut",
      height: CaptainConfirmRidePanelOpen ? "100vh" : "0vh",
    });
  }, [CaptainConfirmRidePanelOpen]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Logout Button Component */}
      <CaptainLogoutButton className="absolute top-12 right-4 z-[1001]" />
      <button
        ref={profileButton}
        onClick={() => navigate("/captain-profile")}
        className="absolute top-26 right-6 z-10 p-3 bg-white rounded-full shadow-md shadow-gray-400"
      >
        <UserRound />
      </button>
      {/* Live Map Tracking Component */}
      <LiveTracking />

      {/* Captain Details Panel */}
      <div className="fixed bg-gray-100 h-[50vh] lg:max-xl:h-[40vh] z-[1001] w-full bottom-0 flex flex-col gap-4 items-center px-4 py-5 rounded-t-3xl border-t border-gray-300 shadow-lg">
        <CaptainDetails />
      </div>

      {/* Ride Request Pop-up Panel */}
      <div
        ref={ridePopUp}
        className="fixed w-full bottom-0 translate-y-full z-[1001] bg-white shadow-lg flex flex-col gap-4 items-center px-4 py-6 rounded-t-3xl border-t border-gray-300"
      >
        <RideAcceptPopUp
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          confirmRideButton={confirmRideButton}
          ride={ride}
        />
      </div>

      {/* Ride Confirmation Panel */}
      <div
        ref={CaptainConfirmRideRef}
        className="fixed w-full bottom-0 translate-y-full z-[1002] bg-white shadow-lg flex flex-col gap-4 items-center px-4 py-6 rounded-t-3xl border-t border-gray-300 min-w-[200px]"
      >
        <CaptainConfirmRide
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setCaptainConfirmRidePanelOpen={setCaptainConfirmRidePanelOpen}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
