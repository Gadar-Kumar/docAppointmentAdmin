import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets_admin/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'







function Login() {
  const [state,setState]=useState('admin')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setToken,backendURL}=useContext(AdminContext)
  const {dtoken,setDtoken}=useContext(DoctorContext)

const onSubmitHandler=async(e)=>{
  e.preventDefault()

  try {
    if(state==='admin'){
      const response=await axios.post(backendURL+'/api/admin/login',{
        email,password
      })

      const data=await response.data

      if(data.success){
        setToken(data.token)
        localStorage.setItem('token',data.token)
        // console.log(data.token);
        toast.success(data.message)
      }else{
       toast.error(data.message)
      }
    }else{
        const {data}=await axios.post(backendURL+'/api/doctor/login',{email,password})

        if(data.success){
          localStorage.setItem('dtoken',data.token)
          setDtoken(data.token)
          // console.log(data.token);
          
        }else{
          toast.error(data.message)
        }
    }
  } catch (error) {
   toast.error(error.message)
  }
}

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' action="">
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg'>
          <p className='text-2xl m-auto font-semibold'><span className='text-blue-400'>{state}</span> Login</p>
          <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
          </div>
           <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
          </div>
          <button type='submit' className='bg-blue-500 text-white rounded cursor-pointer w-full border text-base p-2 mt-4'>login</button>
          {state==='admin'?<p onClick={()=>setState('doctor')} className='text-blue-500 cursor-pointer m-auto'>Login as Doctor</p>:<p onClick={()=>setState('admin')} className='text-blue-500 cursor-pointer m-auto'>Login as Admin</p>}
        </div>
      </form>
    </div>
  )
}

export default Login
