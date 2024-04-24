"use client"
import React, { useState } from 'react'
import { hash } from 'bcryptjs'
import CustomButton from './CustomButton'
import Login from './Login'

export const SignUp = () => {
  const [signUp, setSignUp] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [invalidUsername, setInvalidUsername] = useState('')
  const [invalidEmail, setInvalidEmail] = useState('')
  const [invalidPassword, setInvalidPassword] = useState('')

  const handleShowSignUp = () => {
    setSignUp(true)
  }

  const handleCloseSignUp = () => {
    setSignUp(!signUp)
  }

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleShowLogin = () => {
    setShowLogin(true)
    setSignUp(false)
  }

  const handleHideLogin = () => {
    setShowLogin(false)
  }

  // Input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if(name === 'username' && value.trim() !== '') {
      setInvalidUsername('')
    } else if (name === 'email' && value.trim() !== '') {
      const emailRegex = /\S+@\S+\.\S+/
      if (emailRegex.test(value)) {
        setInvalidEmail('')
      }
    } else if (name === 'password' && value.trim() !== '') {
      if (value.length >= 8) {
        setInvalidPassword('')
      }
    }
  }

  // Sign Up Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

   let isFormValid = true;

    // Username Validation
    if(!formData.username) {
      setInvalidUsername('Please enter a valid username')
      isFormValid = false
    } else {
      setInvalidUsername('')
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/
    
    if(!formData.email || !emailRegex.test(formData.email)) {
      setInvalidEmail('Please enter a valid email address')
      isFormValid = false
    } else {
      setInvalidEmail('')
    }

    // Password validation
    if(!formData.password || formData.password.length < 8) {
      setInvalidPassword("Password must be at least 8 characters")
      isFormValid = false
    } else {
      setInvalidPassword('')
    }

    // If all validations pass, proceed with form submission
    if(isFormValid) {
      const hashedPassword = await hash(formData.password, 10)

      localStorage.setItem('userData', JSON.stringify({ ...formData, password: hashedPassword }))

      setFormData({
        username: '',
        email: '',
        password: '',
      })
      
      setSubmitted(false)
      setShowSuccessMessage(true)
    } 
  }

  return (
    <>
      <div className="flex justify-end items-end min-[320px]:max-[768px]:justify-start min-[320px]:max-[768px]:items-start">
        <CustomButton 
          title="Create Account" 
          btnType="button"
          containerStyles="text-black bg-green-300 -mt-14 mr-20 ml-2 border border-black border-solid font-semibold rounded-xl min-w-[110px] border border-black border-solid min-[320px]:max-[768px]:-mt-6"
          handleClick={handleShowSignUp}
        />
      </div>

      {signUp && (
      <div className={"flex justify-center items-center mt-20"}>
        <div className="sign-up__container relative">
          <div className="sign-up__close">
            <CustomButton 
              title="X"
              btnType="button"
              containerStyles='font-bold rounded-full text-black rounded-full ml-14'
              handleClick={handleCloseSignUp}
            />
          </div>
          <form className="sign-up__form" onSubmit={handleSubmit}>
            <div>
              <h2 className="sign-up__title">CREATE ACCOUNT</h2>
              <input 
                type="text" 
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="sign-up__input"
                required
              />
              {invalidUsername && (<p className="sign-up__error-message">{invalidUsername}</p>)}
            </div>
            <div>
              <input 
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="sign-up__input"
                required
              />
              {invalidEmail && (<p className="sign-up__error-message">{invalidEmail}</p>)}
            </div>
            <div>
              <input 
                type="password" 
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="sign-up__input"
                required
              />
              {invalidPassword && (<p className="sign-up__error-message">{invalidPassword}</p>)}
            </div>
            <div>
              <CustomButton 
                title="Submit"
                btnType="submit"
                containerStyles='w-full py-[16px] rounded-full bg-green-300 border-[1px] border-black border-solid mt-6 py-4'
                textStyles='sign-up__submit text-black text-[20px] leading-[17px] font-bold'
                handleClick={handleSubmit}
              />
  
              {showSuccessMessage && (
                <>
                  <p className="sign-up__success-message">
                    Your account has been created!
                  </p>
                  <CustomButton 
                    title="LOG IN"
                    containerStyles='flex justify-center items-center w-2/3 text-[16px] bg-primary-blue border-[1px] border-black border-solid rounded-xl p-0 mt-4 mx-auto'
                    textStyles='text-white'
                    handleClick={handleShowLogin}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      )}
      <div>
        {showSuccessMessage && showLogin && <Login onClose={handleHideLogin} />}
      </div>
    </>
  )
}

export default SignUp;