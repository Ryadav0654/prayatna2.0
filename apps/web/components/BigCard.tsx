import React from 'react'
import Image from 'next/image'
import CheckIcon from './icons/CheckIcon'

const BigCard = () => {
  return (
    <div className="w-full lg:w-[70%]  lg:h-[80%] flex flex-col lg:flex-row bg-white/20 text-white text-lg rounded-4xl shadow-2xl items-center">
      <div className="w-1/2 h-full relative ">
        <Image 
          src="/fire-noc-certificates.jpg" 
          alt="Image" 
          className="object-cover rounded-l-4xl" 
          layout="fill" 
        />
      </div>
      <div className="w-1/2 px-16">
        <p className="text-2xl font-semibold">
          Follow the procedure for your prior safety avoiding future
          catastrophies:
        </p>
        <ul className="mt-4 text-lg leading-relaxed flex flex-col gap-y-3">
          <li className='flex gap-3'><CheckIcon/>Register/Login</li>
          <li className='flex gap-3'><CheckIcon/>Fill NOC Application</li>
          <li className='flex gap-3'><CheckIcon/>Pay Fees Online</li>
          <li className='flex gap-3'><CheckIcon/>Track Application Status</li>
          <li className='flex gap-3'><CheckIcon/>Fire Department Ispection</li>
          <li className='flex gap-3'><CheckIcon/>NOC Approval &amp; Issuance </li>
          <li className='flex gap-3'><CheckIcon/>Renewal & Compliance</li>
          {/* <li className='flex gap-3'><CheckIcon/>Renewal & Compliance</li> */}
          
        </ul>
      </div>
    </div>
  )
}

export default BigCard
