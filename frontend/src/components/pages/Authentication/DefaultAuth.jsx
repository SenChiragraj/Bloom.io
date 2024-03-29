import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultAuth = () => {
  return (
    <div className=''>
      <Outlet />
    </div>
  )
}

export default DefaultAuth
