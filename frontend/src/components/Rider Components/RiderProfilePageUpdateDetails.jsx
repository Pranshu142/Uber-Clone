import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const RiderProfilePageUpdateDetails = ({
  initialData,
  onUpdate,
  onSubmit,
  onClose,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(initialData);
  };

  const handleIsEditing = function () {
    onClose(false);
  };

  return (
    <div className="p-3 max-h-screen overflow-y-auto">
      <header className="flex justify-between items-center p-2">
        <h1 className="text-xl font-bold text-center mb-5">Update Profile</h1>
        <X
          role="button"
          tabIndex={0}
          className="cursor-pointer"
          onClick={handleIsEditing}
        />
      </header>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2 px-2 py-5 rounded-3xl "
      >
        <fieldset className="border-3 p-2 flex flex-col justify-center gap-3 rounded-2xl">
          <legend className="text-md font-bold bg-white px-5 border-2  py-2 rounded-2xl tracking-wider">
            General Info
          </legend>
          <label htmlFor="changeFirstName" className="text-lg font-semibold">
            First Name
          </label>
          <input
            type="text"
            value={initialData.fullname.firstname}
            onChange={(e) =>
              onUpdate({
                ...initialData,
                fullname: { firstname: e.target.value },
              })
            }
            name="changeFirstName"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500  text-sm  tracking-wider"
          ></input>
          <label htmlFor="changeLastName" className="text-lg font-semibold">
            Last Name
          </label>
          <input
            type="text"
            value={initialData.fullname.lastname}
            onChange={(e) =>
              onUpdate({
                ...initialData,
                fullname: { lastname: e.target.value },
              })
            }
            name="changeLastName"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500  text-sm tracking-wider"
          ></input>
          <label htmlFor="changeGender" className="text-lg font-semibold">
            Gender
          </label>
          <select
            name="gender"
            onChange={(e) =>
              onUpdate({ ...initialData, gender: e.target.value })
            }
            value={initialData.gender || "male"}
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500  text-sm tracking-wider"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="changeDOB" className="text-lg font-semibold ">
            Date of Birth
          </label>
          <input
            type="date"
            onChange={(e) => onUpdate({ ...initialData, dob: e.target.value })}
            value={initialData.dob}
            name="changeDOB"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 mb-2 text-sm  tracking-wider"
          ></input>
        </fieldset>
        <fieldset className="border-3 p-2 flex flex-col justify-center gap-3 rounded-2xl">
          <legend className="text-md font-bold bg-white px-5 border-2  py-2 rounded-2xl tracking-wider">
            Contact Info
          </legend>
          <label htmlFor="changeEmail" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            onChange={(e) =>
              onUpdate({ ...initialData, email: e.target.value })
            }
            value={initialData.email}
            name="changeEmail"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 text-sm"
          ></input>
          <label htmlFor="numberChange" className="text-lg font-semibold">
            Change Mobile Number
          </label>
          <input
            type="number"
            onChange={(e) =>
              onUpdate({ ...initialData, phone: e.target.value })
            }
            value={initialData.phone}
            name="changeMobileNumber"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 text-sm tracking-wider"
          ></input>
        </fieldset>
        <fieldset className="border-3 p-2 flex flex-col justify-center gap-3 rounded-2xl">
          <legend className="text-md font-bold bg-white px-5 border-2  py-2 rounded-2xl tracking-wider">
            Password
          </legend>
          <label htmlFor="changePassword" className="text-lg font-semibold">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="changePassword"
            name="newPassword"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500  text-sm  tracking-wider"
          />
          <label htmlFor="confirmPassword" className="text-lg font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            name="confirmPassword"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500  text-sm  tracking-wider"
          />
        </fieldset>
        <button
          type="submit"
          className="text-xl font-bold px-5 py-3 rounded-2xl bg-blue-400 mt-5 hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

RiderProfilePageUpdateDetails.propTypes = {
  initialData: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RiderProfilePageUpdateDetails;
