import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserState } from '../Context/UserContext';

function HomePage() {

  const navigate = useNavigate('');
  const { userDetails } = UserState();
  return (
    <>
      <h1>Home Page</h1>
      <div className="container">
        <form action="">
          <button onClick={() => { navigate('/login')}}>Login</button>
          <button onClick={() => { navigate('/register')}}>Register</button>
        </form>
      </div>
    </>
  )
}

export default HomePage