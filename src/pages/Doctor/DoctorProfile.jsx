import React, { useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function DoctorProfile() {

  const { dtoken, getProfileData, setProfileData, profileData , backendURL } = useContext(DoctorContext)
  const { currency} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateDate = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      console.log(updateDate);
      

      const { data } = await axios.post(backendURL+'/api/doctor/update-profile', { updateDate }, { headers: { dtoken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message);
      toast.message(error.message)
    }
  }


  useEffect(() => {
    if (dtoken) {
      getProfileData()
    }
  }, [dtoken])


  return profileData && (
    <div className='flex flex-col gap-4 m-5'>
      <div>
        <div>
          <img className='bg-blue-400 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* -- Doc Info*/}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>
              {profileData.degree}-{profileData.speciality}
            </p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          {/**--Doc About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium'>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment Fees: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees:e.target.value }))} value={profileData.fees} /> : profileData.fees} </span></p>
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p>
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>

          </div>
          <div className='flex gap-1 p-2 '>
            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} className='cursor-pointer' type="checkbox" name='' />
            <label htmlFor="">Available</label>
          </div>
          {
            isEdit ?
              <button onClick={updateProfile} className='px-4 py-1 border border-blue-400 text-sm rounded-full mt-5 hover:bg-blue-400 transition-all cursor-pointer'>Save</button>
              :
              <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-blue-400 text-sm rounded-full mt-5 hover:bg-blue-400 transition-all cursor-pointer'>Edit</button>

          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
