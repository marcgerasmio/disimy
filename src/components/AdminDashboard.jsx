import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [topSales, setTopSales] = useState([]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        const result = data.data;


        const aggregatedData = result.reduce((acc, transaction) => {
          const { product_name, quantity } = transaction;
          if (!acc[product_name]) {
            acc[product_name] = { product_name, quantity: 0 };
          }
          acc[product_name].quantity += quantity;
          return acc;
        }, {});

        const topSalesData = Object.values(aggregatedData)
          .sort((a, b) => b.quantity - a.quantity) 
          .slice(0, 20); 

        setTransactions(data.data);
        setTopSales(topSalesData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const logout = () =>{
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 mb-10">
          <nav className="bg-customGreen text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <img src="icon.png" alt="7/11 Logo" className="w-8 h-8 mr-3" />
                <span className="text-xl font-bold">Seven Eleven but Nerfed</span>
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
                       onClick={logout}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex space-x-4 mt-8">
    {/* Transactions Table */}
    <div className="px-6 w-1/2">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Order ID</th>
            <th className="py-2 px-4 border-b text-left">Customer Name</th>
            <th className="py-2 px-4 border-b text-left">Product Name</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b">{transaction.id}</td>
                <td className="py-2 px-4 border-b">{transaction.customer_name}</td>
                <td className="py-2 px-4 border-b">{transaction.product_name}</td>
                <td className="py-2 px-4 border-b">{transaction.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Top Sales Table */}
    <div className="px-6 w-1/2">
      <h2 className="text-2xl font-bold mb-4">Top Sales</h2>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Product Name</th>
            <th className="py-2 px-4 border-b text-left">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {topSales.length > 0 ? (
            topSales.map((sale, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{sale.product_name}</td>
                <td className="py-2 px-4 border-b">{sale.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4">No sales data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </div>
  );
}

export default AdminDashboard;
