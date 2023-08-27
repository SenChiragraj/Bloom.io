import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [currOpenBlog, setCurrOpenBlog] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Check if user info is available in localStorage
    if (userInfo) {
      setUserDetails(userInfo);
    }else {
      // If user info is not available, navigate to the login page
      navigate("/login");
    }

    if(currOpenBlog == null){
      navigate('/blog_page');
    }


  }, [navigate]);

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, currOpenBlog, setCurrOpenBlog }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
