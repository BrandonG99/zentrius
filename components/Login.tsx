"use client"
import React, { useState } from 'react'
import CustomButton from './CustomButton';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {

  const [login, setLogin] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [invalidUsername, setInvalidUsername] = useState('')
  const [invalidPassword, setInvalidPassword] = useState('')

  const handleCloseLogIn = () => {
    onClose()
  }

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

   // Input change
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if(name === 'username' && value.trim() !== '') {
      setInvalidUsername('')
    } else if (name === 'password' && value.trim() !== '') {
      if (value.length >= 8) {
        setInvalidPassword('')
      }
    }
  }

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

    // Password validation
    if(!formData.password || formData.password.length < 8) {
      setInvalidPassword("Password must be at least 8 characters")
      isFormValid = false
    } else {
      setInvalidPassword('')
    }
    
    if(isFormValid) {
      setFormData({
        username: '',
        email: '',
        password: '',
      })
      
      setSubmitted(false)
      setShowSuccessMessage(true)
      // setLogin(false)
    } 
  }

  return (
    <>
      <div className={"flex justify-center items-center mt-20"}>
        <div className="sign-up__container relative min-[320px]:max-[768px]:-mt-36">
          <div className="sign-up__close">
            <CustomButton 
              title="X"
              btnType="button"
              containerStyles='font-bold rounded-full text-black rounded-full ml-14'
              handleClick={handleCloseLogIn}
            />
          </div>
          <form className="sign-in__form">
            <div>
              <h2 className="sign-in__title">LOG IN</h2>
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
              {invalidUsername && (
                <p className="sign-up__error-message">{invalidUsername}</p>
              )}
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
              {invalidPassword && (
                <p className="sign-up__error-message">{invalidPassword}</p>
              )}
            </div>
            <div>
              <CustomButton 
                title="LOG IN"
                btnType="submit"
                containerStyles='w-full py-[16px] rounded-full text-white bg-green-300 border-[1px] border-black border-solid mt-6 py-4'
                textStyles='text-black text-[20px] leading-[17px] font-bold'
                handleClick={handleSubmit}
              />

              {showSuccessMessage && (
                <p className="sign-up__success-message">
                  You are now logged in!
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div>
        {showSuccessMessage}
      </div>
    </>
  )
}

export default Login;