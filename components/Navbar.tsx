"use client"
import React, { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import CustomButton from "./CustomButton"
import SignUp from './SignUp'

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">  
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <h1 className="nav__title text-[28px] font-semibold mt-8 ml-2 min-[320px]:max-[425px]:mt-4">ZENTRIUS</h1>
        </Link>
      </nav>
      <div className="min-[320px]:max-[768px]:hidden">
        {<SignUp />}
      </div>
    </header>
  )
}

export default Navbar