import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserState } from '../../Context/UserContext';

function RegisterPage() {

  const[credentials, setCredentials] = useState ({
    name : '',
    email : '',
    password : '',
    pic : ''
  })
  const { setUserDetails } = UserState();
  const navigate = useNavigate();

  const checkLogin = async (e) => {
    e.preventDefault();
    const { email, password, name, pic } = credentials;
    let user;

    try {
      user = await fetch("http://localhost:5000/api/user/register",{
        method: "POST",
        body: JSON.stringify({email, password, name, pic}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      user =  await user.json();
      // console.log(user);
      setUserDetails(user);
      localStorage.setItem('userInfo', JSON.stringify(user));
      navigate('/blog_page');
    }catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="mt-4 grow flex flex-col items-center justify-around">
        <div className="mt-10">
          <h1 className="text-center x-10 heading">Register</h1>
          <form action="" className="max-w-md mx-auto" onSubmit={checkLogin}>
            <input type="text" value={credentials.name} onChange={e => setCredentials((prev) => ({...prev, name : e.target.value}))} placeholder="Monkey D. Luffy" />
            <input type="email" value={credentials.email} onChange={e => setCredentials((prev) => ({...prev, email : e.target.value}))} placeholder="your@email.com" />
            <input type="password" value={credentials.password} onChange={e => setCredentials((prev) => ({...prev, password : e.target.value}))} placeholder="password" />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already have an account?
              <Link className="underline text-black" to={'/login'}> Login now </Link></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage