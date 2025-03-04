import React from 'react'

interface ButtonProps {
    name: string,
    onclick?: () => void,
    styles?: string
}
const Button = ({name, styles, onclick}: ButtonProps) => {
  return (
    <button className={`bg-gradient-to-r from-cyan-500 to-blue-500  px-3 py-1 transition-color text-lg font-semibol  lg:flex text-white transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 cursor-pointer ${styles}`} onClick={onclick}>{name}</button>
  )
}

export default Button