import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorList() {
  const {doctors,changeAvailability,token,allDoctors}=useContext(AdminContext)

  useEffect(()=>{
    if(token){
      allDoctors()
    }
  },[token])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium '>All Doctors</h1>

      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>{
        doctors.map((item,index)=>(
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-indigo-50 group-hover:bg-blue-500 transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-neutral-800 dark:text-white text-lg font-medium'>{item.name}</p>
              <p className='mt-2 flex items-center gap-1 text-sm'>{item.speciality}</p>
              <div>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox"  checked={item.available}/>
                <p className='dark:text-white'>Available</p>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default DoctorList
