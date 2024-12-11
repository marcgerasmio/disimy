import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Branches from "./components/Branches.jsx";
import Products from "./components/Products.jsx";
import OrderDetails from "./components/OrderDeatails.jsx";
import TransactionHistoryModal from "./components/TransactionHistoryModal.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import MultipleItems from "./components/MultipleItems.jsx";

const Routing = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/multiple-details" element={<MultipleItems />} />
          <Route path="/history" element={<TransactionHistoryModal />} />
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default Routing;
