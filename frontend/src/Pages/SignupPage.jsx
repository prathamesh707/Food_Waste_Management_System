import React from 'react'
import image from '../assets/signup.png'
import ImageComp from '../components/ImageComp'
import SignUpForm from '../components/SignUpForm'

function SignupPage() {
  return (
    <div className='w-full px-10 sm:flex  sm:p-0 justify-evenly items-center' style={{height:"calc(100vh - 64px)"}}>
            <div className='sm:w-4/12 h-5/6'>
                <ImageComp props={image}/>
            </div>
            <div className='w-full  sm:w-4/12 h-5/6 overflow-hidden flex flex-col justify-between rounded-3xl shadow-gray-600 shadow-md'>
                <SignUpForm/>
            </div>
    </div>
  )
}

export default SignupPage