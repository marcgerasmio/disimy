import { useState } from "react";

const topSellingData = [
  { id: 1, name: "Shabubu", sales: 1000, revenue: 50000, branch: "Butuan" },
  {
    id: 2,
    name: "iPhone 100 plus",
    sales: 800,
    revenue: 40000,
    branch: "Butuan",
  },
  {
    id: 3,
    name: "Infinix Hot 100",
    sales: 750,
    revenue: 37500,
    branch: "Butuan",
  },
  { id: 4, name: "T-back Panty", sales: 700, revenue: 35000, branch: "Butuan" },
  { id: 5, name: "Safeguard", sales: 650, revenue: 32500, branch: "Butuan" },
  { id: 6, name: "Shabubu", sales: 500, revenue: 25000, branch: "Davao" },
  {
    id: 7,
    name: "iPhone 100 plus",
    sales: 600,
    revenue: 30000,
    branch: "Davao",
  },
  {
    id: 8,
    name: "Infinix Hot 100",
    sales: 400,
    revenue: 20000,
    branch: "Davao",
  },
  { id: 9, name: "T-back Panty", sales: 500, revenue: 25000, branch: "Davao" },
  { id: 10, name: "Safeguard", sales: 550, revenue: 27500, branch: "Davao" },
];

function TopSellingProducts() {
  const [branchFilter, setBranchFilter] = useState("");

  const filteredData = branchFilter
    ? topSellingData.filter((product) => product.branch === branchFilter)
    : topSellingData;

  const uniqueBranches = [
    ...new Set(topSellingData.map((product) => product.branch)),
  ];

  return (
    <div className="p-5">
  

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData.map((product) => (
          <div
            key={product.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {product.name}
              </h3>
              <div className="mt-2 flex justify-between items-baseline">
                <div className="text-2xl font-semibold text-indigo-600">
                  {product.sales}
                </div>
                <div className="text-sm text-gray-500">units sold</div>
              </div>
              <div className="mt-1 flex justify-between items-baseline">
                <div className="text-2xl font-semibold text-green-600">
                  ${product.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">revenue</div>
              </div>
              <div className="mt-1 text-sm text-gray-500">{product.branch}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSellingProducts;