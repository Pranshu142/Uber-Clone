import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const UPIAppsPaymentMode = ({
  isOpen,
  setIsLoading,
  upiAppName,
  ride,
  socket,
  setPaymentStatus,
}) => {
  const [upiLink, setUpiLink] = useState("");
  const [selectedAppUri, setSelectedAppUri] = useState("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsMobileDevice(/iPhone|Android|iPad|Mobile/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const generateUPILink = async () => {
      if (!ride._id || paymentInitiated) return;

      try {
        setPaymentInitiated(true);

        const linkGenerated = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/payment/generate-upi-link`,
          {
            params: { rideId: ride._id },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (linkGenerated.status === 200) {
          const { upiURL } = linkGenerated.data;
          setUpiLink(upiURL);
        }
      } catch (error) {
        console.error("Unable to generate UPI link:", error);
        alert("Please try again.");
      }
    };

    generateUPILink();
  }, [ride, setIsLoading, socket, paymentInitiated, upiLink]);

  const handlePayment = (appUri) => {
    setSelectedAppUri(appUri);

    if (isMobileDevice && upiLink) {
      const queryString = upiLink.includes("?") ? upiLink.split("?")[1] : "";
      if (queryString) {
        window.location.href = `${appUri}?${queryString}`;
      } else {
        alert("Payment link not available.");
      }
    }
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

      {isMobileDevice ? (
        <div className="grid grid-cols-1 gap-6 mt-8">
          {upiAppName.map((app, index) => (
            <button
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
              onClick={() => handlePayment(app.uri)}
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
      ) : (
        <div className="flex flex-col items-center">
          {upiLink && (
            <>
              <QRCode value={upiLink} size={256} level="H" />
              <p className="text-gray-600 mt-4">Scan to Pay</p>
            </>
          )}
        </div>
      )}

      <div className="mt-auto pt-6">
        <p className="text-center text-sm text-gray-500">
          Your payment is secured with end-to-end encryption
        </p>
      </div>
    </div>
  );
};

UPIAppsPaymentMode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  upiAppName: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  ride: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  setPaymentStatus: PropTypes.func.isRequired,
};

export default UPIAppsPaymentMode;
