import React from 'react'

function Heading({props,color}) {
  console.log(color)
  return (
    <div className='w-full'>
        <h3 className={`text-xl sm:text-[2vw] text-[${color}] font-bold`}>{props}</h3>
    </div>
  )
}

export default Heading