"use client"
import React, { useState, useEffect } from 'react'

interface ImageSlideshowProps {
  images: string[] // Array of image URLS
}

export const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images }) => {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [nextSlideIndex, setNextSlideIndex] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex(nextSlideIndex)
      setNextSlideIndex((nextSlideIndex + 1) % images.length)
    }, 2750) // Change image every 2.75 seconds

    return () => clearInterval(interval)
  }, [images, nextSlideIndex])
   
  return (
    <div className="imageSlideshow">
      {images.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 w-full h-full flex justify-center items-center -mt-10 transition-transform duration-200 ease-in-out ${currentSlideIndex === index ? 'transform translate-x-[-0px] opacity-100' : 'transform translate-x-full opacity-0'}`}
        >  
          <img    
            src={image}
            height={600}
            width={600}
            alt="car image"
            className=""
          />
        </div>
      ))}
    </div>
  )
}

export default ImageSlideshow;
