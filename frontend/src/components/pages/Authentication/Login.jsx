import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserState } from '../../Context/UserContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { userDetails } = UserState();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const checkLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setIsLoggedIn(true); // Update login status
      } else {
        // Handle unsuccessful login
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />; // Redirect to home page if logged in
  }

  return (
    <>
      <div className="mt-4 grow flex flex-col items-center justify-around">
        <div className="mt-20">
          <h1 className="text-center x-10 heading">Login</h1>
          <form action="" className="max-w-md mx-auto" onSubmit={checkLogin}>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  email: e.target.value,
                }))
              }
              placeholder="your@email.com"
            />
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  password: e.target.value,
                }))
              }
              placeholder="password"
            />
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet?
              <Link className="underline text-black" to={'/register'}>
                {' '}
                Register now{' '}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
