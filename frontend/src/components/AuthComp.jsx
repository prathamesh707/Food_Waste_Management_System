import React,{useState} from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function AuthComp() {
    const[flag, setFlag] = useState(false)
  return (
    <div className='w-full sm:w-3/12 mx-auto h-96 rounded-md overflow-hidden'>
        <div className='w-full h-12 flex justify-center items-center text-white bg-blue-400 cursor-pointer'>
            <div className={`w-full h-full flex items-center justify-center  ${flag ? "border-b-2  border-white" : null} `} onClick={e=>setFlag(true)} >Login</div>
            <div className={`w-full h-full flex items-center justify-center ${flag ? null: "border-b-2  border-white"}`} onClick={e=>setFlag(false)}>Sign Up</div>
        </div>
        <div className='w-full h-full bg-blue-400 bg-opacity-30'>
            {
                flag ? <LoginForm/> : <SignUpForm/>
            }
        </div>
    </div>
  )
}

export default AuthComp