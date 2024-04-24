"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import SearchManufacturer  from "./SearchManufacturer"
import Image from "next/image"

const SearchButton = ({ otherClasses }: { otherClasses: string}) => (
  <button type="submit" className={`ml-1 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass icon for the search button"
      width={35}
      height={35}
      className="object-contain bg-primary-blue hover:bg-black rounded-full p-1 min-[768px]:ml-4 min-[768px]:mr-10"
    />
  </button>
)

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("") 
  const [model, setModel] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
      
      // Handle empty inputs
      if (manufacturer === "" && model !== "") {
        return alert("Please select a Car Manufacturer")
      } else if (manufacturer !== "" && model == "") {
        return alert("Please select a Car Model")
      } else if (manufacturer === "" && model === "") {  
        return alert("Please select a Car Manufacturer and a Car Model")      
      }

      updateSearchParams(manufacturer.toLowerCase(), model.toLowerCase())
  }
  
  const updateSearchParams = (manufacturer: string, model: string) => {
    // store URL
    const searchParams = new URLSearchParams(window.location.search)

    // update URL
    if(manufacturer) {
       searchParams.set('manufacturer', manufacturer)
    } else {
      // delete previous manufacturer
      searchParams.delete('manufacturer', manufacturer)  
    }

    if(model) {   
      searchParams.set('model', model)
    } else {
      // delete previous model
      searchParams.delete('model', model)
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathName, { scroll: false })
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__manufacturer">
        <SearchManufacturer 
          manufacturer={manufacturer} 
          setManufacturer={setManufacturer} 
        />
      </div>
      <div className="searchbar__model">
        <Image 
          src="/model-icon.png"
          alt="car model icon image"
          width={22}
          height={22}
          className="absolute -mt-[2px] ml-5"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Enter Car Model"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
        <SearchButton otherClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar