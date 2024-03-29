import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [userToken, setUserToken] = useState();

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, userToken, setUserToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
