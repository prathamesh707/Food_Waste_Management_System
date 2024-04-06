import React from 'react'
import ImageComp from '../components/ImageComp'
import image from '../assets/login.png'
import LoginForm from '../components/LoginForm'
function LoginPage() {
  return (
    <div className='w-full px-10 sm:flex flex-row-reverse sm:p-0 justify-evenly items-center' style={{height:"calc(100vh - 64px)"}}>
            <div className='sm:w-4/12 h-4/6'>
                <ImageComp props={image} color={"#084c6a"}/>
            </div>
            <div className='w-full  sm:w-4/12 h-4/6 overflow-hidden flex flex-col justify-between rounded-3xl shadow-gray-600 shadow-md'>
                <LoginForm/>
            </div>
    </div>
  )
}

export default LoginPage