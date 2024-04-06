import React,{useState, useEffect} from 'react'
import image1 from '../assets/login.png'
import image2 from '../assets/signup.png'
import image3 from '../assets/imgcon.png'

function Corsouel() {

    const images = [image1, image2, image3];
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 5000); 
  
      return () => clearInterval(intervalId);
    }, []); 
  

  return (

      <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-2/3  w-11/12 mt-4" data-carousel="slide">
        <div className="relative rounded-lg md:h-96">
          {images.map((image, index) => (
            <div key={index} className={`duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`} data-carousel-item>
                <div className="border-2 bg-gray-300 rounded-md  absolute block w-3/12 h-4/6 -translate-y-1/2 top-1/2 left-1">
                    <img src={images[index-1]?images[index-1]:images[images.length-1]}  alt={`Slide ${index + 1}`} 
                    className='w-full h-full'/>
                </div>
                <div className="absolute block w-3/12 h-4/6 bg-gray-300 -translate-x-1/2  top-1/2 left-1/2 rounded-md">
                <img src={image}  alt={`Slide ${index + 1}`} 
                className='h-full w-full'/>
                </div>
                <div  className="absolute block w-3/12 h-4/6 rounded-md bg-gray-300 -translate-y-1/2 top-1/2 right-0" >
                <img src={images[index+1]?images[index+1]:images[0]} alt={`Slide ${index + 1}`} 
                className='w-full h-full'/>
                </div>
              
             
            </div>
          ))}
        </div>

        {/* <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {images.map((_, index) => (
            <button key={index} type="button" className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`} aria-current={index === currentIndex} aria-label={`Slide ${index + 1}`} onClick={() => setCurrentIndex(index)}></button>
          ))}
        </div> */}
     
    </div>
  )
}

export default Corsouel