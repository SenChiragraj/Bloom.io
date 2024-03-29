import React from 'react'
import { NavLink } from 'react-router-dom';

const LinkErrorHandler = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl'>ErrorHandler</h1>
      <div className="flex flex-row gap-2 m-2">
        <NavLink className={'bg-black text-white p-2 rounded-md w-20 text-center'}  to={'/login'}>Login</NavLink>
      <NavLink className={'bg-black text-white p-2 rounded-md w-20 text-center'} to={'/register'}>Register </NavLink>
        <NavLink className={'bg-black text-white p-2 rounded-md w-20 text-center'}  to={'/'}>Home </NavLink>
      </div>
    </div>
  )
}

export default LinkErrorHandler;