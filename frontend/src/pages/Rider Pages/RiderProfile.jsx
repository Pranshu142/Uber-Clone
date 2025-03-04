import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  ChevronLeft,
  Save,
  X,
  User2Icon,
  MailIcon,
  PhoneIcon,
  User2,
  TimerIcon,
  Bike,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RiderProfilePageUpdateDetails from "../../components/Rider Components/RiderProfilePageUpdateDetails";

const RiderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/riders/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(response.data.rider);
        setFormData({
          firstname: response.data.rider.fullname.firstname,
          lastname: response.data.rider.fullname.lastname,
          email: response.data.rider.email,
          phone: response.data.rider.phone || "",
          gender: response.data.rider.gender || "",
          age: response.data.rider.age || "",
          totalRides: response.data.rider.totalRides || 0,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/riders/profile/update`,
        {
          fullname: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(response.data.rider);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-100  ">
      <ToastContainer position="top-center" />
      {/* Header */}
      <header className=" rounded-b-md shadow-md shadow-gray-400 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronLeft size={24} color="black" />
            </button>
            <h1 className="text-xl font-semibold text-black">Profile</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            {isEditing ? (
              <X size={24} color="black" />
            ) : (
              <div className="px-5 py-2 bg-gray-300 rounded-2xl shadow-md shadow-slate-500">
                <span className="text-md font-semibold text-black">Edit</span>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Profile content  */}
      <div className="container px-3 w-full py-2 max-w-2xl ">
        <div className=" p-3 mt-10   shadow-md shadow-gray-500 rounded-t-md  border-1 border-gray-400 overflow-x-hidden flex-grow">
          {/** Section-1 constaining Pic and user name */}
          <section className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-10 mb-6">
            {/* Profile Picture */}
            <div className="flex justify-center md:justify-start">
              <div className="w-24 h-24 bg-gray-300 shadow-md rounded-full overflow-hidden">
                {/* {<User2Icon color="black" size={48} />} */}
                <img
                  src="https://images.unsplash.com/photo-1527010154944-f2241763d806?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fG1lbnN8ZW58MHx8MHx8fDA%3D"
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
            </div>
            {/* Name */}
            <div className="text-center md:text-left">
              <h1 className="text-lg font-bold tracking-wide">
                <span>{formData.firstname + " " + formData.lastname}</span>
              </h1>
            </div>
          </section>

          {/* Divider */}
          <div className="w-full border-t border-gray-300 mb-4"></div>

          {/* Profile Details */}
          {[
            {
              icon: <MailIcon size={24} />,
              label: "Email",
              value: formData.email,
            },
            {
              icon: <PhoneIcon size={24} />,
              label: "Phone",
              value: formData.phone || "+91 9305709783",
            },
            {
              icon: <User2Icon size={24} />,
              label: "Gender",
              value: formData.gender || "Male",
            },
          ].map((item, index) => (
            <section
              key={index}
              className="w-full flex flex-col  items-center gap-4  mb-4 sm:flex-row"
            >
              {/* Left (Icon + Label) */}
              <div className="flex items-center justify-start gap-4 w-full pr-4 sm:w-1/2">
                {item.icon}
                <h1 className="text-md font-semibold">{item.label}</h1>
              </div>
              {/* Right (Value) */}
              <div className="w-full sm:w-7xl">
                <h1 className="tracking-wide shadow-md bg-gray-200 p-3 rounded-md w-full text-start">
                  <span>{item.value}</span>
                </h1>
              </div>
            </section>
          ))}

          {/* Divider */}
          <div className="w-full border-t border-gray-300 mb-4"></div>
          <section className="grid grid-cols-3 gap-3">
            <div className="subsection-1 flex flex-col justify-center items-center  ">
              <UserRound color="#5600f5" />
              <h1>
                <span>{formData.age == "" ? "21" : formData.age}</span>
              </h1>
            </div>
            <div className="subsection-2 flex flex-col justify-center items-center  ">
              <TimerIcon color="blue" />
              <h1>
                <span>67</span>
              </h1>
            </div>
            <div className="subsection-3 flex flex-col justify-center items-center  ">
              <Bike color="red" />
              <h1>
                <span>{formData.totalRides}</span>
              </h1>
            </div>
          </section>
        </div>
      </div>
      <footer className="bg-gray-200  py-4 px-6 mt-20 s text-gray-800 rounded-t-xl shadow-md shadow-slate-600">
        <div className="w-full  text-center">
          <h2 className="text-base  font-semibold">Need Help?</h2>
          <p className="text-sm text-gray-700 mt-1">
            We&apos;re here for you 24/7. Reach out anytime!
          </p>

          <div className="mt-3 flex justify-center gap-3">
            <button className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">
              Help Center
            </button>
            <button className="flex-1 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg">
              Terms & Privacy
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            © 2025 Uber Clone. All rights reserved.
          </p>
        </div>
      </footer>
      <div className="editing-pannel fixed  min-h-screen w-screen bg-gray-200 bottom-0 ">
        <RiderProfilePageUpdateDetails formData={formData} />
      </div>
    </div>
  );
};

export default RiderProfile;
