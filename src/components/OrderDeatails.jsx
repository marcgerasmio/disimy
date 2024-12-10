import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const productData = {
  id: 1,
  name: "Shabubu",
  price: 29.99,
  description: "High quality Shabu made in China.",
  stock: 10,
};

function OrderDetails() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const product = productData;
  const total = product.price * quantity;

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, Math.min(value, product.stock)));
  };

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleGoToTransactionHistory = () => {
    navigate("/transaction-history");
  };

  const orderData = {
    orderId: "12345",
    product: {
      name: product.name,
      price: product.price,
    },
    quantity: quantity,
    shipping: 5.0,
  };

  const subtotal = orderData.product.price * orderData.quantity;
  const totalAmount = subtotal + orderData.shipping;

  return (
    <div className="container mx-auto px-4 py-8 bg-customGreen">
      <div className="bg-white rounded-lg shadow-md p-7 max-w-5xl mx-auto">
        <div className="flex justify-center mb-5">
          <h1 className="text-3xl font-bold">Order Details</h1>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row gap-6 mt-5">
          <div className="md:w-1/2">
            <img
              src={`https://via.placeholder.com/300x200`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold mb-4">
              Price: ${product.price}
            </p>
            <p className="text-green-600 mb-4">In Stock: {product.stock}</p>
          </div>
          <div className="md:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="bg-gray-200 px-3 py-2 rounded-l-md hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="border-t border-b border-gray-300 px-3 py-2 w-20 text-center"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${product.price * quantity}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${(total + 5).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-24 justify-end">
              <button
                onClick={() => navigate("/products")}
                className="btn btn-error text-white"
              >
                <FaEdit className="mr-2" /> Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="btn bg-customOrange hover:bg-customOrange text-white"
              >
                <FaShoppingCart className="mr-2" /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-green-700 mb-2 justify-center flex gap-2">
                <FaCheckCircle className="mt-1" />
                Order Successful!
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Thank you for your purchase!
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="mb-3 flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span>{orderData.orderId}</span>
              </div>
              <div className="mb-3 flex justify-between">
                <span className="font-medium">Product:</span>
                <span>{orderData.product.name}</span>
              </div>
              <div className="mb-3 flex justify-between">
                <span className="font-medium">Price:</span>
                <span>${orderData.product.price.toFixed(2)}</span>
              </div>
              <div className="mb-3 flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>{orderData.quantity}</span>
              </div>
              <div className="mb-3 flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mb-3 flex justify-between">
                <span className="font-medium">Shipping:</span>
                <span>${orderData.shipping.toFixed(2)}</span>
              </div>
              <div className="mb-4 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Link to="/products">
                <button
                  onClick={handleGoToTransactionHistory}
                  className="btn bg-customOrange hover:bg-customOrange text-white w-full py-2 rounded-md transition duration-200"
                >
                  Go to Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
