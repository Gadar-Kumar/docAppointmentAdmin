import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

function Sidebar() {
    const {token}=useContext(AdminContext)
    const {dtoken}=useContext(DoctorContext)


  return (
    <div className='min-h-screen dark:bg-black dark:text-white bg-white border-r'>
      {
        token && <ul className='text-gray-500 mt-5 dark:text-white'>

        <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-violet-100 dark:bg-gray-500 border-r-4 border-blue-400':''}`} to={`/admin-dashboard`}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink>

         <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-violet-100 dark:bg-gray-500 border-r-4 border-blue-400':''}`} to={`/all-appointments`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointment</p>
        </NavLink>

         <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-violet-100 dark:bg-gray-500 border-r-4 border-blue-400':''}`} to={`/add-doctor`}>
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Doctor</p>
        </NavLink>

         <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-violet-100 dark:bg-gray-500 border-r-4 border-blue-400':''}`} to={`/doctor-list`}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Doctors List</p>
        </NavLink>

        </ul>
      }

      {
        dtoken && <ul className='text-gray-500 mt-5 dark:text-white'>

        <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-violet-100 dark:bg-gray-500 border-r-4 border-blue-400':''}`} to={`/doctor-dashboard`}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink>

         <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-violet-100 dark:bg-gray-500 border-r-4 border-blue-400':''}`} to={`/doctor-appointment`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointment</p>
        </NavLink>

         <NavLink className={({isActive})=>`flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-violet-100 dark:bg-gray-500 border-r-4 border-blue-400':''}`} to={`/doctor-profile`}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Doctors Profile</p>
        </NavLink>

        </ul>
      }
    </div>
  )
}

export default Sidebar
