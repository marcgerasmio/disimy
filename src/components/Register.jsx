import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="icon.png" alt="Logo" className="w-24 h-24" />
        </div>
        <form>
          <div className="mb-2">
            <input
              type="file"
              id="image"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm">
              Show Password
            </label>
          </div>
          <div className="mb-4 flex gap-2">
            <select
              id="role"
              className="w-1/2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 bg-customGreen text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
              Register
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-customOrange hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
