import React, { useState } from "react";

const inventoryData = [
  { id: 1, branch: "Butuan", product: "Safeguard", stock: 100, sold: 50 },
  { id: 2, branch: "Davao", product: "Shabubu", stock: 75, sold: 25 },
  { id: 3, branch: "Surigao", product: "iPhone 100 plus", stock: 50, sold: 30 },
  { id: 4, branch: "Manila", product: "T-back Panty", stock: 60, sold: 40 },
  { id: 5, branch: "Cebu", product: "Infinix Hot 100", stock: 80, sold: 20 },
];

function InventoryOverview() {
  const [branchFilter, setBranchFilter] = useState("");

  const filteredData =
    branchFilter === ""
      ? []
      : inventoryData.filter((item) => item.branch === branchFilter);

  const uniqueBranches = [...new Set(inventoryData.map((item) => item.branch))];

  return (
    <div className="p-5 bg-white shadow sm:rounded-lg">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Inventory Overview
        </h2>
        <select
          id="branch"
          className=" border-gray-300 rounded-md shadow-sm"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
        >
          <option value="">-- Select a Branch --</option>
          {uniqueBranches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sold
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.sold}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && branchFilter !== "" && (
          <div className="text-center py-4 text-gray-500">
            No products available for this branch
          </div>
        )}
        {branchFilter === "" && (
          <div className="text-center py-4 text-gray-500">
            Please select a branch to view products
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryOverview;
