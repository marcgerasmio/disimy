import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { MdLocalGroceryStore } from "react-icons/md";

const products = [
  { id: 1, name: "Safeguard", price: 19.99, type: "Home", stock: 10000 },
  { id: 2, name: "Wings", price: 29.99, type: "Home", stock: 20 },
  {
    id: 3,
    name: "iPhone 100 plus",
    price: 39.99,
    type: "Electronics",
    stock: 0,
  },
  { id: 4, name: "White T-Shirt", price: 49.99, type: "Clothing", stock: 0 },
  { id: 5, name: "T-Back Panty", price: 59.99, type: "Clothing", stock: 25 },
  {
    id: 6,
    name: "Infinix Hot 2000",
    price: 69.99,
    type: "Electronics",
    stock: 8,
  },
];
const productTypes = ["All", "Electronics", "Clothing", "Home"];

function Products() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.type === filter);

  const handleBuyNow = () => {
    navigate(`/order-details`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-8 mb-16">
        <div className="flex justify-between">
          <div className="flex">
            <MdLocalGroceryStore size={30} />
            <h1 className="text-2xl font-bold mb-8 ms-2">Our Products</h1>
          </div>
          <div>
            <label htmlFor="filter" className="mr-2 font-semibold">
              Filter by:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md p-2"
            >
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={`https://via.placeholder.com/300x200`}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p
                className={`mb-4 ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : "Out of Stock"}
              </p>
              <div className="flex items-center justify-between">
                <button className="text-secondary font-bold hover:underline">
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product.id)}
                  className={`btn bg-customOrange text-white ${
                    product.stock > 0
                      ? "hover:bg-customOrange"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={product.stock === 0}
                >
                  Check Out <FaShoppingCart className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
