import React from 'react'
import ImageComp from '../components/ImageComp'
import image from '../assets/imgcon.png'
import Heading from '../components/Heading'
import Paragraph from '../components/Paragraph'
import ContactForm from '../components/ContactForm'
function ContactPage() {

    const para =`sfsdfsfsfdsfaf s fsfsfhsfwf sfjosf flsdf sftge fsf9dls fsflssofwf  fshfsfsfwrs dsifhfs fshf fs9oew  sfjf d9ff fhsfs fsdifsffn fds9fsfsjfhefw 
    eewrwerwr`
  return (
  
        <div className='w-full px-10 sm:flex sm:p-0 justify-evenly items-center' style={{height:"calc(100vh - 64px)"}}>
            <div className='sm:w-4/12 h-4/6'>
                <ImageComp props={image}/>
            </div>
            <div className='w-full  sm:w-4/12 h-4/6 overflow-hidden flex flex-col justify-between'>
                <Heading props={"Contact Us"} color={"#084c6a"}/>
                <ContactForm/>
            </div>
        </div>
            
      
 
  )
}

export default ContactPage