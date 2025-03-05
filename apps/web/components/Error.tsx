"use client";
import { motion } from "motion/react"; // Import motion from Framer Motion
import Link from "next/link";
import Image from "next/image";

interface ErrorProps {
    message: string
}
const NotFound = ({message}: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
      <Image src="/truck.png" alt="Truck Animation" width={120} height={60} />
      
      {/* Error Text with Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mt-4 text-red-500"
      >
        404 - Page Not Found
      </motion.h1>

      {/* Subtitle */}
      <p className="mt-2 text-lg text-gray-300 text-center">
        Oops! Looks like the page you are looking for doesn’t exist.
        
      </p>
      <p className="mt-2 text-xl text-red-500 text-center">
        {message}
        
      </p>

      {/* Go Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
