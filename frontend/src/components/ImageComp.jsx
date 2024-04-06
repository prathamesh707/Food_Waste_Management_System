import React from 'react'

function ImageComp({props}) {
  return (
    <div className='w-full h-full'>
        <img src={props} alt="" className='w-full h-full' />
    </div>
  )
}

export default ImageComp