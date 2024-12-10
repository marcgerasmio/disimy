import React, { useState } from "react";

const purchaseHistoryData = [
  {
    id: 1,
    orderId: "ORD001",
    customer: "John Doe",
    date: "2023-06-01",
    total: 150.0,
    branch: "Main Store",
  },
  {
    id: 2,
    orderId: "ORD002",
    customer: "Jane Smith",
    date: "2023-06-02",
    total: 200.0,
    branch: "Branch 1",
  },
  {
    id: 3,
    orderId: "ORD003",
    customer: "Bob Johnson",
    date: "2023-06-03",
    total: 100.0,
    branch: "Branch 2",
  },
  {
    id: 4,
    orderId: "ORD004",
    customer: "Alice Brown",
    date: "2023-06-04",
    total: 300.0,
    branch: "Main Store",
  },
  {
    id: 5,
    orderId: "ORD005",
    customer: "Charlie Davis",
    date: "2023-06-05",
    total: 250.0,
    branch: "Branch 1",
  },
];

function PurchaseHistory() {
  const [branchFilter, setBranchFilter] = useState("");

  const filteredData =
    branchFilter === ""
      ? []
      : purchaseHistoryData.filter(
          (purchase) => purchase.branch === branchFilter
        );

  const uniqueBranches = [
    ...new Set(purchaseHistoryData.map((purchase) => purchase.branch)),
  ];

  return (
    <div className="p-5 bg-white shadow sm:rounded-lg">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Purchase History
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
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {purchase.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {purchase.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {purchase.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${purchase.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && branchFilter !== "" && (
          <div className="text-center py-4 text-gray-500">
            No purchases found for this branch.
          </div>
        )}
        {branchFilter === "" && (
          <div className="text-center py-4 text-gray-500">
            Please select a branch to view purchase history.
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseHistory;
