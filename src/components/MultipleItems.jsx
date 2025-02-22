import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const initialOrderItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    quantity: 1,
    image: "https://via.placeholder.com/100x100?text=Headphones",
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 19.99,
    quantity: 2,
    image: "https://via.placeholder.com/100x100?text=Phone+Case",
  },
  {
    id: 3,
    name: "USB-C Cable",
    price: 9.99,
    quantity: 3,
    image: "https://via.placeholder.com/100x100?text=USB+Cable",
  },
];

function MultipleItems() {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState(initialOrderItems);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [showReceipt, setShowReceipt] = useState(false); // State for modal visibility

  useEffect(() => {
    const selectedItems = JSON.parse(sessionStorage.getItem("selectedItems"));
    if (selectedItems) {
      setOrderItems(selectedItems);
    }
  }, []);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      for (const item of orderItems) {
        const productResponse = await fetch(`http://localhost:1337/api/products?filters[product_name][$eq]=${item.product_name}`);
        const productData = await productResponse.json();
  
        if (productResponse.ok && productData.data.length > 0) {
          const productStock = productData.data[0].stock;
  
          if (item.quantity > productStock) {
            alert(`Order quantity for ${item.name} is greater than available stock.`);
            return;
          }
  

          const updatedStock = productStock - item.quantity;
          const updateResponse = await fetch(`http://localhost:1337/api/products/${productData.data[0].documentId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { stock: updatedStock } }),
          });
  
          if (!updateResponse.ok) {
            const errorData = await updateResponse.text();
            console.error(`Failed to update stock for ${item.name}:`, errorData);
            return;
          }
        } else {
          alert(`Product ${item.name} not found.`);
          return;
        }
      }

      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      for (const item of orderItems) {
        const cartData = {
          data: {
            product_name: item.product_name,
            quantity: item.quantity,
            total: item.price * item.quantity,
            customer_name: item?.user_name || "Guest",
            date: formattedDate,
            branch_name: item.branch_name,
            modeOfPayment: paymentMethod,
          },
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
            console.log(`Transaction added:`, data);
          } else {
            const errorData = await response.text();
            console.error("Failed to add item:", errorData);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      alert("All items processed!");
      handleDelete();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  
  const handleDelete = async () => {
    for (const item of orderItems) {
      try {
        const response = await fetch(`http://localhost:1337/api/carts/${item.documentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(`Item with id ${item.id} deleted:`, data);
        } else {
          const errorData = await response.text();
          console.error(`Failed to delete item with id ${item.id}:`, errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
  
  navigate("/products");
    
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-customGreen min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Items in Your Order</h2>
            <hr />
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <div>
                    <h3 className="font-semibold">{item.product_name}</h3>
                    <p className="text-gray-600">Quantity:{item.quantity}</p>
                    <p className="text-gray-600">₱{item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <hr />
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Select Payment Method:</h3>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="Paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="paypal">Paypal</label>
              </div>
              {paymentMethod === "Paypal" && (
                <div className="mt-4">
                  <div className="mb-3">
                    <label htmlFor="accountName" className="block font-medium mb-1">
                      Account Name:
                    </label>
                    <input
                      type="text"
                      id="accountName"
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Enter account name"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accountNumber" className="block font-medium mb-1">
                      Account Number:
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={handleSubmit}
                className="btn bg-customOrange text-white hover:bg-customOrange"
              >
                <FaShoppingCart className="mr-2" /> Confirm Order
              </button>
              <button
                onClick={() => navigate("/products")}
                className="btn bg-slate-500 text-white hover:bg-slate-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Receipt</h2>
            <hr />
            <div className="mt-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.product_name} x {item.quantity}</span>
                  <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-semibold mt-4">
                <span>Total:</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <span>Mode of Payment : {paymentMethod}</span>
            <button
               onClick={() => navigate("/products")}
              className="btn bg-customOrange text-white hover:bg-customOrange mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultipleItems;
