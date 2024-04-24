"use client"
import React, { useState } from 'react'
import { ImageSlideshow } from './ImageSlideshow';
import CustomButton from './CustomButton';
import SignUp from './SignUp';

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("explore-cars")

    if(nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [showSignUp, setShowSignUp] = useState(false);

  const handleClick = () => {
    setShowSignUp(!showSignUp)
  }

  const images = ['grey-mercedes-min.png', 'red-audi-min.png', 'white-ford-min.png', 'acura-min.png', 'white-audi-min.png']
 
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title mt-4 ml-2 min-[320px]:max-[768px]:-mt-10">
          <span className="text-primary-blue">Rent Cars</span> Without the Usual Hassle
        </h1>

        <ul> 
          <li className="hero__subtitle -mb-3 ml-2">
            Stress-free booking process. 
          </li>
          <li className="hero__subtitle mb-14 ml-2">
            1000s of cars to choose from.
          </li>
        </ul>

        <div className="min-[768px]:hidden">
          {<SignUp />}
        </div>

        <CustomButton 
          title="View Available Cars"
          containerStyles="hero__view-cars min-[768px]:max-[1280px]:mb-20"
          handleClick={handleScroll}
        />
      </div>
      
      <div className="hero__image-container">         
        <div className="hero__image min-[768px]:max-[1280px]:-mb-14 min-[768px]:max-[1280px]:-mr-20">
          <ImageSlideshow    
            images={images}
          />
        </div>
        
        <div className="hero__image-overlay" />        
      </div>
    </div> 
  )
}

export default Hero