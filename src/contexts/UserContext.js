import { createContext, useContext, useState } from "react";

// const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const storeUserData = (data) => {
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, storeUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
