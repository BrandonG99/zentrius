"use client"
import { useState } from "react"
import Image from "next/image"
import { CarProps } from "@/types"
import CustomButton from "./CustomButton"   
import { calculateCarRent, generateCarImageUrl } from "@/utils"  
import CarModal from "./CarModal"

interface CarCardProps {
  car: CarProps;
}

const CarCard = ( { car }: CarCardProps ) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen]= useState(false)

  const carRent = calculateCarRent(city_mpg, year)

  return (
    <div className="car-card group">
      <div className='car-card__content'>
        <h2 className="car-card__content-title text-primary-black">
          {make} {model}
        </h2>
      </div>
      
      <div>
        <p className="car-card__price-content flex mt-5 text-[32px] text-black font-extrabold">
          <span className="self-start text-[16px] font-semibold mr-1">
            £
          </span>
          <span className="self-start text-[20px] font-semibold">{carRent}</span>
          <span className="self-end text-[16px] font-medium ml-1">
            /day
          </span>
        </p>
      </div>

      <div className="car-card__image relative w-full h-40 my-3 object-contain">
        <Image src={generateCarImageUrl(car)}
          fill
          priority
          alt="car model image"
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex w-full justify-between text-gray min-[768px]:group-hover:invisible">
          <div className="car-card__icon">
            <Image 
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel image"
            />
            <p className="text-[14px] text-primary-black font-semibold">
              {transmission === 'a' ? 'AUTOMATIC' : 'MANUAL'} 
            </p>
          </div>
          <div className="car-card__icon">
            <Image 
              src="/tire.svg"
              width={20}
              height={20}
              alt="tire image"
            />
            <p className="text-[14px] text-primary-black font-semibold">
              {drive.toUpperCase()}
            </p>
          </div>
          <div className="car-card__icon">
            <Image 
              src="/gas.svg"
              width={20}
              height={20}
              alt=" image"
            />
            <p className="text-[14px] text-primary-black font-semibold">
              {city_mpg} MPG
            </p>         
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton 
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue min-[768px]:hover:bg-black"
            textStyles="text-white text-[14px] leading-[17px] font-bold"   
            rightIcon="/right-arrow.svg"    
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarModal isOpen={isOpen} closeModal={() => 
        setIsOpen(false)} car={car}
      />
    </div>
  )
}

export default CarCard