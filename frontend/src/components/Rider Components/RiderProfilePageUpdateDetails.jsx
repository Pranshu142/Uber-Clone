const RiderProfilePageUpdateDetails = ({ formData }) => {
  return (
    <div className="p-3 ">
      <h1 className="text-xl font-bold text-center mb-5">Update Profile</h1>
      <form className="w-full flex flex-col gap-2 px-2 py-5 rounded-3xl max-h-screen overflow-y-auto">
        <fieldset className="border-3 p-2 flex flex-col justify-center gap-3 rounded-2xl">
          <legend className="text-md font-bold bg-white px-5 border-2  py-2 rounded-2xl tracking-wider">
            General Info
          </legend>
          <label htmlFor="changeFirstName" className="text-lg font-semibold">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstname}
            name="changeFirstName"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 font-semibold text-lg  tracking-wider"
          ></input>
          <label htmlFor="changeLastName" className="text-lg font-semibold">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastname}
            name="changeLastName"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 font-semibold text-lg  tracking-wider"
          ></input>
          <label htmlFor="changeGender" className="text-lg font-semibold">
            Gender
          </label>
          <select
            name="gender"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 font-semibold text-lg  tracking-wider"
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
            value={formData.age}
            name="changeDOB"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 mb-2 font-semibold text-lg  tracking-wider"
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
            value={formData.email}
            name="changeEmail"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500"
          ></input>
          <label htmlFor="numberChange" className="text-lg font-semibold">
            Change Mobile Number
          </label>
          <input
            type="number"
            value={formData.phone}
            name="changeMobileNumber"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 font-semibold text-lg  tracking-wider"
          ></input>
        </fieldset>
        <fieldset className="border-3 p-2 flex flex-col justify-center gap-3 rounded-2xl">
          <legend className="text-md font-bold bg-white px-5 border-2  py-2 rounded-2xl tracking-wider">
            Password
          </legend>
          <label htmlFor="changePassword" className="text-lg font-semibold">
            Change Password
          </label>
          <input
            type="password"
            id="changePassword"
            name="newPassword"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 font-semibold text-lg  tracking-wider"
          ></input>
          <label htmlFor="confirmPassword" className="text-lg font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="px-3 py-2 bg-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 font-semibold text-lg  tracking-wider"
          ></input>
        </fieldset>
        <button className="text-xl font-bold px-5 py-3 rounded-2xl bg-blue-400 mt-5">
          Save
        </button>
      </form>
    </div>
  );
};

export default RiderProfilePageUpdateDetails;
