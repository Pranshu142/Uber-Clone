import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const UPIAppsPaymentMode = ({
  isOpen,
  setIsLoading,
  isLoading,
  upiAppName,
  ride,
  socket,
  setPaymentStatus,
}) => {
  const [upiLink, setUpiLink] = useState("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const checkMobileDevice = () => {
      setIsMobileDevice(
        /iPhone|Android|iPad|Mobile/i.test(navigator.userAgent)
      );
    };
    checkMobileDevice();
  }, []);

  // Generate UPI payment link
  const generateUPILink = useCallback(async () => {
    if (!ride?._id || paymentInitiated) return;

    try {
      setIsLoading(true);
      setError(null);
      setPaymentInitiated(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/payment/generate-upi-link`,

        {
          params: { rideId: ride._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200 && response.data?.upiURL) {
        setUpiLink(response.data.upiURL);
      } else {
        throw new Error("Invalid UPI link received");
      }
    } catch (error) {
      console.error("UPI link generation failed:", error);
      setError("Failed to generate payment link. Please try again.");
      setPaymentInitiated(false);
    } finally {
      setIsLoading(false);
    }
  }, [ride?._id, paymentInitiated, setIsLoading]);

  useEffect(() => {
    generateUPILink();
  }, [generateUPILink]);

  // Handle payment completion
  useEffect(() => {
    if (!socket) return;

    const handlePaymentDone = (data) => {
      console.log("Payment event received:", data);

      if (data.status === "success" && data.rideId === ride._id) {
        setPaymentStatus(true);
        setIsLoading(false);
        setPaymentInitiated(false);

        if (typeof isOpen === "function") {
          isOpen(false);
        }

        // Navigate after a short delay to ensure state updates
        setTimeout(() => navigate("/rider-home"), 5000);
      } else {
        setPaymentStatus(false);
        setError("Payment verification failed. Please try again.");
      }
    };

    socket.on("payment-done", handlePaymentDone);

    return () => {
      socket.off("payment-done", handlePaymentDone);
    };
  }, [socket, ride?._id, setPaymentStatus, setIsLoading, isOpen, navigate]);

  // Handle payment initiation
  const handlePayment = useCallback(
    (appUri) => {
      if (!isMobileDevice || !upiLink) {
        setError("Payment method not available");
        return;
      }

      const queryString = upiLink.includes("?") ? upiLink.split("?")[1] : "";

      if (!queryString) {
        setError("Invalid payment link");
        return;
      }

      window.location.href = `${appUri}?${queryString}`;
    },
    [isMobileDevice, upiLink]
  );

  // Render payment methods
  const renderPaymentMethods = () => {
    if (isMobileDevice) {
      return (
        <div className="grid grid-cols-1 gap-6 mt-8">
          {upiAppName.map((app, index) => (
            <button
              key={index}
              className="flex w-full items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
              onClick={() => handlePayment(app.uri)}
              disabled={!upiLink || !paymentInitiated}
            >
              <div className="flex items-center">
                <img src={app.img} alt={app.name} className="w-12 h-12 mr-4" />
                <span className="text-lg font-semibold text-gray-800">
                  {app.name}
                </span>
              </div>
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        {upiLink && (
          <>
            <QRCode value={upiLink} size={256} level="H" />
            <p className="text-gray-600 mt-4">Scan to Pay</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Choose Payment Method
        </h1>
        <p className="text-gray-600">
          Select your preferred UPI app for secure payment
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {renderPaymentMethods()}

      <div className="mt-auto pt-6">
        <p className="text-center text-sm text-gray-500">
          Your payment is secured with end-to-end encryption
        </p>
      </div>
    </div>
  );
};

UPIAppsPaymentMode.propTypes = {
  isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  upiAppName: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  ride: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  socket: PropTypes.object.isRequired,
  setPaymentStatus: PropTypes.func.isRequired,
};

export default UPIAppsPaymentMode;
