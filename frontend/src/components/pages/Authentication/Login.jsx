import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserState } from '../../Context/UserContext';


const Login = () => {

  const navigate  =useNavigate('');
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const {userDetails} = UserState();

  const checkLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    let user;

    try {
      user = await fetch("http://localhost:5000/api/user/login",{
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let response = await user.json();
      console.log(response);
      let finalres = JSON.stringify(response);
      console.log(finalres);
      // setUserDetails(user);
      // user =  await user.json();
      // console.log(user);
      localStorage.setItem('userInfo', finalres);
      navigate('/blog_page');
    }catch (e) {
      console.log(e);
    }
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
              <Link className="underline text-black" to={"/register"}>
                {" "}
                Register now{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login