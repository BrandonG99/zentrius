"use client"
import { useState, Fragment } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { updateSearchParams } from '@/utils'
import { CustomFilterProps } from '@/types'

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])
  
  const handleUpdateParams = (e: { title: string, value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase())  

    router.push(newPathName, {scroll: false})
  }

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e)
          handleUpdateParams(e)
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">
              {selected.title}
            </span>
            <Image
              src="/chevron-up-down.svg"
              alt="up and down icon for custom search filters"
              width={20}
              height={20}
              className="ml-4 object-contain"
            />
          </Listbox.Button>

          <Transition 
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title} 
                  className={({ active }) => `relative cursor-befault select-none py-2 px-4 ${active ?'bg-primary-blue text-white' : 'text-gray-900'}`}
                  value={option}
                >
                  <span className={`block truncate ${option.title === selected.title ? 'font-bold' : 'font-normal'}`}>
                    {option.title}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}