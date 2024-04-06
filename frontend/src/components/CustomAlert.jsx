import React from 'react'
import { useNavigate } from 'react-router-dom'

function CustomAlert() {
    const navigate = useNavigate()
  return (
    <div className='w-96  bg-[#f0f4f2] shadow-gray-600 shadow-md absolute top-44 left-1/2 -translate-x-1/2 rounded-md p-2 text-white text-center'>
        <p className='w-full  font-semibold text-lg text-black/50'>Sorry You are not authenticated</p>
        <p className='text-black/50'>Please Login</p>
        <button 
        onClick={(e)=>navigate("/login")}
        className='mt-10 mb-5 bg-[#4959d2] py-2 rounded-full px-10 text-gray-30 shadow-gray-600 shadow-sm active:shadow-none'>Click here to login</button>
    </div>
  )
}

export default CustomAlert