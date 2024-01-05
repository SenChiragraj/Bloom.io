/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { UserState } from "../../Context/UserContext";

function Navbar() {
  const { userDetails } = UserState();
  const [ show, setShow ] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/auth/");
  };

  return (
    <div className="mainContainer navContainer sticky top-0">
      <p className="site-title">Bloom.io</p>
      <div className="profile-container">
        <div className="profile-photo">
          <img
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className="profile-pic"
            src={userDetails.pic}
            alt="Rounded avatar"
          />
        </div>
        <div className="profile-menu" style={{ opacity: show ? 1 : 0 }} onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}>
          <h3>{userDetails?.name}</h3>
          <ul >
            <li>
              <button>
                Profile
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
