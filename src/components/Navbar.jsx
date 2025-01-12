import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { TbClockDollar } from "react-icons/tb";
import CartModal from "./CartModal";
import TransactionHistoryModal from "./TransactionHistoryModal";

const Navbar = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] =
    useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const clear = () => {
    sessionStorage.clear();
  };


  return (
    <header className="bg-customGreen text-white font-bold">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src="icon.png" alt="7/11 Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">Seven Eleven </span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isProfileOpen ? "true" : "false"}
              >
                <img
                  src={userDetails.image}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-bold">{userDetails.name}</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20">
                  <button
                    onClick={() => setIsTransactionHistoryOpen(true)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <TbClockDollar className="inline mr-2" /> Purchase History
                  </button>
                  <Link
                    to="/"
                    onClick={clear}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <TransactionHistoryModal
        isOpen={isTransactionHistoryOpen}
        onClose={() => setIsTransactionHistoryOpen(false)}
      />
    </header>
  );
};

export default Navbar;