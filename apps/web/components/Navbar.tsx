"use client"
import React, {useState} from 'react'
import Link from 'next/link';
import { navLinks } from '../utils/constant';
import { motion } from 'motion/react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import Logo from './icons/Logo';
import apiClient from '../utils/apiclient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  }

  let token;
  if(typeof window !== 'undefined' && window.localStorage){
    token = localStorage.getItem("token");
  }
 
  const handleLogout = async () => {
    try {
      const res = await apiClient.post("/users/logout", {});
      if (res.status === 201) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <nav className='sticky top-0 z-50 backdrop-blur-2xl'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 text-white ">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link href="/" className='flex items-center gap-2'>
            <Logo/>
              <span className="text-xl lg:text-2xl font-extrabold">SmartFireNet</span>
            </Link>
          </div>

          {/* Menu Button for Mobile */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white "
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex justify-center items-center  sm:space-x-4">
            {
                navLinks.map((link) => (
                    <Link key={link.name} href={link.path}>
                        <span className="hover:bg-gradient-to-l hover:from-cyan-500 hover:to-blue-500 px-3 py-2 rounded-full text-lg font-semibold ">{link.name}</span>
                    </Link>
                ))
            }
            {
              token ? (
                <Button name="Logout" styles="rounded-2xl px-4 py-2 font-semibold" onclick={() => {
                  handleLogout();
                
                }}/>
              ) : (
                <Button name="Login" styles="rounded-2xl px-4 py-2 font-semibold" onclick={() => router.push("/login")}/> 
              )
              
            }
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3 text-white">
            {
                navLinks.map((link) => (
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    variants={list}
                    key={link.name}>
                    <Link key={link.name} href={link.path} >
                        <motion.li variants={item} onClick={() => setIsOpen(false)}   className="block hover:bg-gray-700 px-3 py-2 text-center rounded-full text-lg font-bold">{link.name}</motion.li>
                    </Link>
                  </motion.ul>
                ))
            }
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar