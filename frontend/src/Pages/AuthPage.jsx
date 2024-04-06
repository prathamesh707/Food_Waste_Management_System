import React from 'react'
import AuthComp from '../components/AuthComp'
import CoverImage from '../assets/authcover.jpg'

function AuthPage() {
  return (
    <div className='w-full h-[calc(90vh)] flex justify-center items-center relative' >
        <img src={CoverImage} alt="" className='w-full h-full absolute z-1' />
        <div className='w-full h-full absolute flex items-center'>
        <AuthComp/>
        </div>
       
    </div>
  )
}

export default AuthPage