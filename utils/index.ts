import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel, limit } = filters

  const headers = {
    'X-RapidAPI-Key': '7e99d5ecf3msh94133aaa4fd6728p149897jsn57248aa79b66',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?manufacturer=${manufacturer}&model=${model}&fuel_type=${fuel}&year=${year}&limit=${limit}`, 
    {
      headers: headers,
    }
  )

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.43; // Additional rate per mile driven
  const ageFactor = 0.05; // Additonal rate based on age of car

  // Calculate additional rate based on mileage rate 
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rent rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate 

  return rentalRatePerDay.toFixed(2)
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage')
  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery')
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle ? angle : ''}`)

  return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {

  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set(type, value)

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`

  return newPathName
}

export const deleteSearchParams = (type: string) => {

  const newSearchParams = new URLSearchParams(window.location.search)

  newSearchParams.delete(type.toLocaleLowerCase())

  const newPathName = `${window.location.pathname}?${newSearchParams.toString()}`

  return newPathName
}