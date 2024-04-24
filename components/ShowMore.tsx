"use client"
import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import { updateSearchParams } from "@/utils"
import CustomButton from "./CustomButton"
     
const ShowMore = ({ pageNumber, isNext }: ShowMoreProps ) => {
  const router = useRouter()

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 6;
    const newPathName = updateSearchParams("limit", `${newLimit}`)
    router.push(newPathName, { scroll: false })
  }

  return (  
    <div className="w-full flex-center gap-10 mt-10 mb-10">
      {
       <CustomButton 
          title="Show More Cars"
          btnType="button"
          containerStyles="font-bold bg-primary-blue rounded-full text-white min-[320px]:max-[768px]:bg-green-300 min-[320px]:max-[768px]:text-black hover:bg-green-300 hover:text-black"
          handleClick={handleNavigation}
       />
      }
    </div>
  )
}

export default ShowMore