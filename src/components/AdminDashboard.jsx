import Footer from "./Footer";
import InventoryOverview from "../components/InventoryOverview";
import TopSellingProducts from "../components/TopSellingProducts";
import PurchaseHistory from "../components/PurchaseHistory";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-100 mb-10">
        <nav className="bg-customGreen text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <img src="icon.png" alt="7/11 Logo" className="w-8 h-8 mr-3" />
                <span className="text-xl font-bold">
                  Seven Eleven but Nerfed
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none space-x-2"
                >
                  <FaUser />
                  <span className="text-sm font-medium">Admin</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => console.log("Logout clicked")}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-3">
              <TopSellingProducts />
            </div>
            <div className="mt-8">
              <InventoryOverview />
            </div>
            <div className="mt-8">
              <PurchaseHistory />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
