import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are dedicated to providing high-quality products and excellent
              customer service.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Products
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              123 E-commerce St.
              <br />
              City, State 12345
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@example.com
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 7/11 but Nerfed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
