// TransactionHistoryModal.js
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

// Mock Data
const transactionData = [
  {
    id: 1,
    orderId: "ORD12345",
    date: "2024-12-01",
    total: 45.99,
    status: "Completed",
    items: [
      {
        name: "Item 1",
        quantity: 2,
        price: 15.49,
        imageUrl: "/images/item1.jpg",
      },
      {
        name: "Item 2",
        quantity: 1,
        price: 9.99,
        imageUrl: "/images/item2.jpg",
      },
    ],
  },
  {
    id: 2,
    orderId: "ORD12346",
    date: "2024-12-02",
    total: 39.99,
    status: "Cancelled",
    items: [
      {
        name: "Item 3",
        quantity: 3,
        price: 9.99,
        imageUrl: "/images/item3.jpg",
      },
    ],
  },
];

const TransactionHistoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-3/4 max-w-4xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Transaction History</h2>
          <button onClick={onClose} className="text-blue-500 hover:underline">
            <FaArrowLeft className="inline mr-1" /> Close
          </button>
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Product Image
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {transaction.orderId}
                </td>
                <td className="py-3 px-4 text-sm">
                  {transaction.items[0] && (
                    <img
                      src={transaction.items[0].imageUrl}
                      alt={transaction.items[0].name}
                      className="w-12 h-12 object-cover"
                    />
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {transaction.items[0] && transaction.items[0].name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {transaction.date}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  ${transaction.total.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`font-medium ${
                      transaction.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistoryModal;
