import React from 'react'

function LoginForm() {
    const handleSubmit = (e)=>{
        e.preventDefault();
    }

  return (
    <div className='w-full h-full pt-10 bg-[#8cc8ff]  overflow-hidden relative'>
        <div className='w-full my-4'>
          <h2 className='text-center text-[4vw] sm:text-[2vw] font-semibold text-[#084c6a]'>Log in to your account</h2>
        </div>
        <form action="" onSubmit={handleSubmit}
        className=' w-8/12 mx-auto flex flex-col mt-10 gap-5 text-black'>
        <input type="email" placeholder='Registered Email'
        className='w-full h-10 bg-transparent border-2 pl-2 border-gray-600 outline-none rounded-full bg-white placeholder-black'/>
        <input type="password" placeholder='Password'
        className='w-full h-10 bg-transparent border-2 border-gray-600 outline-none rounded-full pl-2 bg-white placeholder-black' />
        <button type='submit'
        className='w-6/12 mx-auto shadow-gray-600 shadow-md  py-2 bg-[#347a99] rounded-full text-white mt-10 active:shadow-none'>Login</button>
        </form>
        <h2 className='w-full text-center font-semibold absolute bottom-2'>Create account if you don't have any</h2>
    </div>
  )
}

export default LoginForm