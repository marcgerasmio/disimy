import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [topSales, setTopSales] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [cashOnDeliveryCount, setCashOnDeliveryCount] = useState(0);
  const [paypalCount, setPaypalCount] = useState(0);
  const [dailySales, setDailySales] = useState([]);
  const [selectedBranchForSales, setSelectedBranchForSales] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/transactions?pagination[pageSize]=1000");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        const result = data.data;
  
        // Count payment methods
        const paymentCounts = result.reduce(
          (acc, transaction) => {
            if (transaction.modeOfPayment === "Cash on Delivery") {
              acc.cashOnDelivery += 1;
            } else if (transaction.modeOfPayment === "Paypal") {
              acc.paypal += 1;
            }
            return acc;
          },
          { cashOnDelivery: 0, paypal: 0 }
        );
  
        setCashOnDeliveryCount(paymentCounts.cashOnDelivery);
        setPaypalCount(paymentCounts.paypal);
  
        // Unique branches
        const uniqueBranches = [...new Set(result.map((transaction) => transaction.branch_name))];
        setBranches(uniqueBranches);
  
        setTransactions(result);
  
        // Top sales
        const filteredData = selectedBranch
          ? result.filter((transaction) => transaction.branch_name === selectedBranch)
          : result;
  
        const aggregatedData = filteredData.reduce((acc, transaction) => {
          const { product_name, quantity } = transaction;
          if (!acc[product_name]) {
            acc[product_name] = { product_name, quantity: 0 };
          }
          acc[product_name].quantity += quantity;
          return acc;
        }, {});
  
        const topSalesData = Object.values(aggregatedData)
          .filter((sale) => sale.quantity > 0)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 20);
  
        setTopSales(topSalesData);
  
        // Daily sales for the past 7 days
        const now = new Date();
        const past7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - i);
          const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
          return formattedDate;
        });
  
        const dailySalesData = past7Days.map((date) => {
          const sales = result
            .filter(
              (transaction) => {
                // Format the transaction date to MM/DD/YYYY
                const transactionDate = new Date(transaction.date);
                const formattedTransactionDate = `${(transactionDate.getMonth() + 1).toString().padStart(2, '0')}/${transactionDate.getDate().toString().padStart(2, '0')}/${transactionDate.getFullYear()}`;
                return formattedTransactionDate === date &&
                  (!selectedBranchForSales || transaction.branch_name === selectedBranchForSales);
              }
            )
            .reduce((sum, transaction) => sum + parseInt(transaction.total || 0, 10), 0);
          return { date, sales };
        });
  
        setDailySales(dailySalesData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactions();
  }, [selectedBranch, selectedBranchForSales]);
  
  
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 mb-10">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
        <div className="container mx-auto flex h-21 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <img src="icon.png" alt="7/11 Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">Seven Eleven</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar focus:outline-none"
                aria-haspopup="true"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src="me.jpg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <Link to="/">
                  <li>
                    <button className="text-left w-full">Logout</button>
                  </li>
                </Link>
              </ul>
            </div>
            <p className="font-bold">Admin</p>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mt-8">
          {/* Transactions Table */}
          <div className="px-6 w-1/3">
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <div className="flex mb-3">
              <h2 className="me-3">Cash on Delivery: {cashOnDeliveryCount}</h2>
              <h2>Paypal: {paypalCount} </h2>
            </div>
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full bg-white shadow-md rounded mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Order ID</th>
                    <th className="py-2 px-4 border-b text-left">Payment Method</th>
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
                        <td className="py-2 px-4 border-b">{transaction.modeOfPayment}</td>
                        <td className="py-2 px-4 border-b">{transaction.customer_name}</td>
                        <td className="py-2 px-4 border-b">{transaction.product_name}</td>
                        <td className="py-2 px-4 border-b">{transaction.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No transactions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Sales Table */}
          <div className="px-6 w-1/3">
            <h2 className="text-2xl font-bold mb-4">Top Sales</h2>
            <select
              className="w-full px-4 py-2 mt-2 mb-2 border rounded"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
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
                    <td colSpan="2" className="text-center py-4">
                      No sales data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Sales Per Day Table */}
          <div className="px-6 w-1/3">
            <h2 className="text-2xl font-bold mb-4">Total Sales Per Day</h2>
            <select
              className="w-full px-4 py-2 mt-2 mb-2 border rounded"
              value={selectedBranchForSales}
              onChange={(e) => setSelectedBranchForSales(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <table className="min-w-full bg-white shadow-md rounded mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {dailySales.length > 0 ? (
                  dailySales.map((day, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{day.date}</td>
                      <td className="py-2 px-4 border-b">{day.sales}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-4">
                      No sales data available
                    </td>
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
