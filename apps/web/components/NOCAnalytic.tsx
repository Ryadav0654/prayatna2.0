// components/NocAnalytics.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react'; // Import useAnimationControls

interface NocAnalyticsProps {
  totalApplicants: number;
  nocPassed: number;
  certificatesIssued: number;
}

const NocAnalytics: React.FC<NocAnalyticsProps> = ({
  totalApplicants,
  nocPassed,
  certificatesIssued,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls(); // Get animation controls

  // Intersection Observer to detect when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once in view
        }
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.2, // Trigger when at least 20% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);


  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2, // Stagger the animation of child elements
      },
    },
  };

    // Animation variants for the labels
    const labelVariants = {
        hidden: { opacity: 0, x: -10 }, // Start slightly to the left
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

  // Function to animate the numbers (counting animation)
  const animateNumbers = () => {
    const animateValue = (start: number, end: number, duration: number, element: HTMLElement) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    if (ref.current) {
      const applicantNumberElement = ref.current.querySelector(".applicant-number");
      const passedNumberElement = ref.current.querySelector(".passed-number");
      const issuedNumberElement = ref.current.querySelector(".issued-number");

      if (applicantNumberElement) animateValue(0, totalApplicants, 1500, applicantNumberElement as HTMLElement);
      if (passedNumberElement) animateValue(0, nocPassed, 1500, passedNumberElement as HTMLElement);
      if (issuedNumberElement) animateValue(0, certificatesIssued, 1500, issuedNumberElement as HTMLElement);
    }
  };


    useEffect(() => {
    if (inView) {
        controls.start("visible"); // Start card animations
      animateNumbers(); // Start the number counting animation
    }
  }, [inView, controls, totalApplicants, nocPassed, certificatesIssued]);


  return (
    <motion.div
      className="bg-[#020030] py-12"
      initial="hidden"
      animate={controls}  // Use the animation controls here
      variants={{
        hidden: { opacity: 0 },  // Fade in the whole section
        visible: {
            opacity: 1,
            transition: {
                delay: 0.1,  // Small delay before starting
                staggerChildren: 0.3  // Animate children one by one.
            }
        },
      }}
      ref={ref} // Attach the ref to the main div
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
             variants={labelVariants}
             className="text-3xl font-extrabold text-white text-center mb-8">
          NOC Analytics
        </motion.h2>
        <motion.div
            variants={cardVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Total Applicants Card */}
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="text-5xl font-bold text-blue-600 mb-2 applicant-number">
              0
            </div>
            <motion.div variants={labelVariants} className="text-lg text-gray-700">Total Applicants</motion.div>
          </motion.div>

          {/* NOC Passed Card */}
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="text-5xl font-bold text-green-600 mb-2 passed-number">
              0
            </div>
            <motion.div variants={labelVariants} className="text-lg text-gray-700">NOC Passed</motion.div>
          </motion.div>

          {/* Certificates Issued Card */}
          <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="text-5xl font-bold text-yellow-600 mb-2 issued-number">
                0
            </div>
            <motion.div variants={labelVariants} className="text-lg text-gray-700">Certificates Issued</motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NocAnalytics;