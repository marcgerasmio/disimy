import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { MdLocalGroceryStore } from "react-icons/md";

const productTypes = ["All", "Electronics", "Clothing", "Home"];

function Products() {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/categories");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data.data || []);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      const selectedBranch = sessionStorage.getItem("selectedBranch");

      if (!selectedBranch) {
        setError("No branch selected");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[branch_name][$eq]=${selectedBranch}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category_name === filter);

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const cartData = {
      data: {
        product_name: selectedProduct.product_name,
        quantity: quantity,
        price: selectedProduct.product_price,
        user_name: userDetails.name,
        branch_name: selectedProduct.branch_name,
      }
    };


    const jsonString = JSON.stringify(cartData);

    try {
      const response = await fetch("http://localhost:1337/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product added to cart!");
        console.log(data);
        closeModal(); 
      } else {
        const errorData = await response.text(); 
        alert("Failed to add to cart!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to cart!");
    }
  };

  const handleCheckout = async (product) => {
    console.log(product)
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const cartData = {
      data: {
        product_name: product.product_name,
        quantity: quantity,
        total: product.product_price * quantity,
        customer_name: userDetails.name,
        date: formattedDate,
        branch_name: product.branch_name,
      }
    };


    const jsonString = JSON.stringify(cartData);

    try {
      const response = await fetch("http://localhost:1337/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product bought successfully!");
      window.location.reload();
      } else {
        const errorData = await response.text(); 
        alert("Failed to buy product!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to cart!");
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  
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
            {/* Category dropdown */}
            <label htmlFor="category" className="ml-4 mr-2 font-semibold">
              Category:
            </label>
            <select
              id="category"
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{product.product_name}</h2>
              <p className="text-gray-600 mb-2">${product.product_price}</p>
              <p
                className={`mb-4 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </p>
              <div className="flex items-center justify-between">
                <button
                  className="text-secondary font-bold hover:underline"
                  onClick={() => openModal(product)}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleCheckout(product)}
                  className={`btn bg-customOrange text-white ${
                    product.stock > 0 ? "hover:bg-customOrange" : "opacity-50 cursor-not-allowed"
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

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedProduct.product_name}
            </h2>
            <img
            src={selectedProduct.image}
              alt={selectedProduct.product_name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <p className="text-gray-600 mb-4">Price: ${selectedProduct.product_price}</p>
            <div className="mb-4">
              <label htmlFor="quantity" className="mr-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={selectedProduct.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded p-2 w-20"
              />
            </div>
            <form onSubmit={handleSubmit} className="flex justify-end items-center">
              <button type="submit" className="btn bg-green-500 text-white mr-2">
                Add to Cart
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn bg-red-500 text-white"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Products;
