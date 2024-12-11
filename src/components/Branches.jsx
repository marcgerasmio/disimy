import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Branches() {
  const [branches, setBranches] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Fetch branches from Strapi API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/branches");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data.data);
        setBranches(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return <p>Loading branches...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleCardClick = (branchName) => {
    sessionStorage.setItem("selectedBranch", branchName);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mb-10">
        <div className="flex justify-center">
          <h2 className="text-3xl font-semibold text-center mb-8 relative">
            Our Branches
            <span className="absolute bottom-0 left-0 right-0 mx-auto w-1/6 h-1 bg-customOrange"></span>
          </h2>
        </div>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {branches.map((branch) => (
            <Link
              key={branch.id}
              to={`/products`}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300 h-64 flex flex-col justify-center"
              onClick={() => handleCardClick(branch.branch_name)}
            >
              <div className="flex items-center justify-center mb-4">
                <FaStore className="text-8xl text-customRed" />
              </div>
              <h2 className="text-2xl font-semibold text-center">
                {branch.branch_name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Branches;
