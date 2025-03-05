import React from "react";
import Link from "next/link";
import Logo from "./icons/Logo";
const Footer = () => {
  return (
    <footer className="bg-[#020030]/30 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-center">
        {/* Logo and Branding Section */}
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <Link
            href="/"
            className="flex justify-center gap-3 items-center text-2xl font-extrabold hover:text-gray-300"
          >
            <Logo />
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">SmartFireNet</span>
          </Link>
          <p className="mt-2 text-lg opacity-75">
            Innovating Fire Safety Solutions
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <p className="text-xl font-extrabold mb-4">Quick Links</p>
          <ul className="space-y-2 text-lg">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Services Section */}
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <p className="text-xl font-extrabold mb-4">Our Services</p>
          <ul className="space-y-2 text-lg">
            <li>
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-gray-300">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gray-300">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm opacity-75">
          © 2025 SmartFireNet. All Rights Reserved.
        </p>
        <div className="mt-4 space-x-6">
          <Link href="#" className="hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <i className="fab fa-linkedin-in"></i>
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
