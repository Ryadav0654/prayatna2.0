import React from 'react'
import Image from 'next/image'

const Card = () => {
  return (
    <div className="max-w-[20%] h-[80%] flex flex-col bg-white/70 rounded-4xl shadow-2xl items-center">
      <div className="w-full h-[70%] relative">
        <Image
          src="/fire-noc-certificates.jpg"  // Replace with your image path
          alt="Card Image"
          layout="fill"                  // This makes the image cover the div
          className="object-cover rounded-t-4xl"
        />
      </div>
      <div className="px-5 py-3 text-center">
        <p className="text-xl font-semibold">
          Follow the procedure for your prior
        </p>
      </div>
    </div>
  )
}

export default Card
