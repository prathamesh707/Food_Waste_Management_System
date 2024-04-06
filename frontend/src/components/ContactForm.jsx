import React from 'react'

function ContactForm() {
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}
    className='w-full h-full mt-10 py-6  rounded-md flex flex-col  justify-center gap-6  text-black'>
        <input type="text"  placeholder='Name'
        className='w-8/12 border-2 h-10 rounded-full pl-3 border-[#084c6a] bg-transparent  outline-none placeholder-[#386a76]'/>
        <input type="text"  placeholder='Name'
        className='w-8/12 border-2 h-10 rounded-full pl-3 border-[#084c6a] bg-transparent  outline-none placeholder-[#386a76]'/>
        <textarea placeholder='Tell us anythig you want'
        className='w-8/12 h-20 border-2 row-10 rounded-xl pl-3 border-[#084c6a] bg-transparent  outline-none placeholder-[#386a76] '/>
      
        <button  type="submit" className='w-8/12 bg-[#084c6a] py-2 rounded-full  mt-4 text-white'>Send</button>
    </form>
  )
}

export default ContactForm