import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState, useContext } from "react";
import CaptainLogoutButton from "../components/CaptainLogoutButton";
import LiveTracking from "../components/LiveTracking";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { Coins, MapPin, MapPinOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";

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
  const location = useLocation();
  const ride = location.state.ride;
  const navigate = useNavigate();
  const [qrCodePanelOpen, setQrCodePanelOpen] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const qrCodeRef = useRef(null);

  const { socket } = useContext(SocketContext);
  // const [paymentDone, setPaymentDone] = useState(false);
  // Function to complete the ride
  useEffect(() => {
    socket.on("payment-initiated", (data) => {
      const { upiURL } = data;
      console.log(upiURL);
      setQrCodeValue(upiURL);
    });

    return () => {
      socket.off("payment-initiated");
    };
  }, []);

  const handleRideComplete = async () => {
    try {
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/ride/ride-completed`, null, {
          params: {
            rideId: ride._id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setQrCodePanelOpen(true);
            setCompleteRidePanelOpen(false);
          }
        });
    } catch (error) {
      console.error("Error completing ride:", error);
    }
  };

  const captianRideDetailInfoUpdate = async () => {
    try {
      await axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL
          }/captains/captain-ride-details-updation`,
          null,
          {
            params: {
              rideId: ride._id,
              captainId: ride.captain._id,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("captain ride detail updated");
          }
        });
    } catch (error) {
      console.error("Error updating captain ride details:", error);
    }
  };

  const updatePaymentStatus = async () => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/payment/payment-status-update`,
          null,
          {
            params: {
              rideId: ride._id,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("Payment status updated", res.data.message);
            navigate("/captain-home");
          }
        });
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };
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

  useGSAP(() => {
    if (qrCodePanelOpen) {
      gsap.to(qrCodeRef.current, {
        transform: "translateY(0)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(qrCodeRef.current, {
        transform: "translateY(100%)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [qrCodePanelOpen]);

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
          <h2 className="text-3xl sm:text-2xl font-bold text-center">
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
            <h3 className="text-lg sm:text-lg font-bold">
              {ride ? ride.rider.fullname.firstname : "Rider Name"}
            </h3>
          </div>
          <h3 className="text-lg sm:text-lg w-full text-center sm:text-end font-bold">
            {ride ? ride.distance : "Distance in Km"} km
          </h3>
        </div>

        {/* Ride details with icons */}
        {[
          {
            icon: <MapPin />,
            text: ride ? ride.startLocation : "Pickup Location",
          },
          {
            icon: <MapPinOff />,
            text: ride ? ride.endLocation : "Drop Location",
          },
          { icon: <Coins />, text: ride ? ride.fare : "50" },
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
        <button
          onClick={() => {
            handleRideComplete();
          }}
          className="bg-green-300 w-full px-4 py-3 sm:px-5 sm:py-4 rounded-full text-center text-lg sm:text-xl font-semibold active:border-2 active:border-black transition-all duration-200"
        >
          Finish Ride
        </button>
      </div>

      {/* QR Code Panel */}
      <div
        ref={qrCodeRef}
        className="fixed w-full bottom-0 translate-y-full z-[1003] bg-white rounded-t-3xl shadow-lg flex flex-col gap-6 items-center px-3 py-4 sm:gap-10 sm:px-6 sm:py-5 border-2 border-gray-400"
      >
        <h2 className="text-3xl font-bold">Pay Here!</h2>
        {/* Replace with your actual QR code */}
        <QRCode value={qrCodeValue} size={256} level="H" />
        <h3 className="text-lg font-bold">Scan to Pay</h3>
        <button
          onClick={() => {
            setQrCodePanelOpen(false);
            captianRideDetailInfoUpdate();
            updatePaymentStatus();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default CaptainRidingStart;
