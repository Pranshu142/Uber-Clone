import React, { createContext } from "react";

export const UserDataContext = createContext();
const test = "test";
const UserContext = ({ children }) => {
  return (
    <div>
      <UserDataContext.Provider value={test}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
