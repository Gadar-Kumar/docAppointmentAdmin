import React from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import {useNavigate} from 'react-router-dom'
import ToggleTheme from './ToggleTheme';

function Navbar() {
    const { token ,setToken} = useContext(AdminContext);
    const navigate=useNavigate();
    const logout=()=>{
        navigate('/')
        token && setToken('')
        token && localStorage.removeItem('token')
    }

  return (
    <div className='flex dark:text-white justify-between items-center px-4 sm:px-10 py-3 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-600'>{token ? 'Admin':'Doctor'}</p>
      </div>
      <div className='flex items-center gap-4'>
      <button onClick={logout} className='bg-blue-600 cursor-pointer text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      <ToggleTheme />
      </div>
    </div>
  )
}

export default Navbar
