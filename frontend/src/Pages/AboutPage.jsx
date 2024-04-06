import React from 'react'
import ImageComp from '../components/ImageComp'
import carrain from '../assets/carRain.jpg'
import Heading from '../components/Heading'
import Paragraph from '../components/Paragraph'

function AboutPage() {
    const para = "loremjsdfsf hosfsfjfk sfoshwkwjw  sfosfsffo k fjdsoffs fsfs fsnfdfiddvdv ddoj ods fsdjfosf sfsf sfsifsf sfisfjsffsfsfshffsefsjfseifjfskfadsfods dsfdsf sdifpsfips"

  return (
    <div className='w-full p-10 sm:flex sm:p-0 justify-evenly items-center' style={{height:"calc(100vh - 64px)"}}>
        <div className='sm:w-4/12 h-3/6'>
            <ImageComp props={carrain}/>
        </div>
        <div className='w-full mt-10 sm:mt-0 sm:w-4/12 h-3/6 '>
            <Heading props={"About"} />
            <Paragraph props={para}/>
        </div>
    </div>
  )
}

export default AboutPage