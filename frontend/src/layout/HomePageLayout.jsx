import React, { useEffect } from 'react'
import { UserState } from '../components/Context/UserContext'
import { useLocation, Navigate, Outlet } from 'react-router-dom';


const HomePageLayout = () => {

  const { userDetails } = UserState();
  return (
    <div className=' h-screen '>
      {userDetails ?  <Outlet /> : <Navigate to='/login'  />}
    </div>
  );
}

export default HomePageLayout