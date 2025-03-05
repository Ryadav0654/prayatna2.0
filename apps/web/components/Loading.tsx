"use client";
import { motion } from "motion/react";
import Image from "next/image";

interface LoadingProps {
  text: string;
}
const Loading = ({text}: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Fire Truck Animation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image src="/truck.png" alt="Truck Animation" width={120} height={60} />
      </motion.div>

      {/* Title with Fade-in Effect */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-3xl font-bold mt-4"
      >
        Fire Monitoring System
      </motion.h1>

      {/* Spinning Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="mt-6 w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full"
      ></motion.div>

      {/* Loading Text */}
      <p className="mt-3 text-lg text-gray-300">{text}</p>
    </div>
  );
};

export default Loading;