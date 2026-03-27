import React from "react";
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign } from "react-icons/fi";

const DashboardCard = ({ title, value, icon, trend, color }: any) => (
  <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div className={`rounded-lg p-3 ${color}`}>
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <span className={`text-sm font-bold ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
      </span>
    </div>
    <h3 className="mt-4 text-copy font-medium text-black/50">{title}</h3>
    <p className="mt-1 text-heading-md font-bold text-black">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$128,430", icon: <FiDollarSign />, trend: "+12.5%", color: "bg-brand" },
    { title: "Orders", value: "456", icon: <FiShoppingBag />, trend: "+5.2%", color: "bg-black" },
    { title: "Customers", value: "2,345", icon: <FiUsers />, trend: "+8.1%", color: "bg-brand" },
    { title: "Conversion Rate", value: "3.4%", icon: <FiTrendingUp />, trend: "-1.2%", color: "bg-black" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-heading-lg font-bold tracking-heading text-black">Dashboard Overview</h1>
        <p className="text-copy font-medium text-black/50">Welcome back, Admin. Here is what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-heading-sm font-bold text-black">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line text-label font-bold uppercase text-black/50">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="text-copy">
                    <td className="py-4 pr-4 font-bold">#ORD-00{i}</td>
                    <td className="py-4 pr-4">John Doe</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-600">
                        Paid
                      </span>
                    </td>
                    <td className="py-4 font-bold">$2,999</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-heading-sm font-bold text-black">Top Products</h2>
          <div className="space-y-4">
            {[
              { name: "XX99 Mark II Headphones", sales: "124 sales", price: "$2,999" },
              { name: "ZX9 Speaker", sales: "89 sales", price: "$4,500" },
              { name: "YX1 Wireless Earphones", sales: "72 sales", price: "$599" },
              { name: "ZX7 Speaker", sales: "54 sales", price: "$3,500" },
            ].map((product) => (
              <div key={product.name} className="flex items-center justify-between border-b border-line pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-black">{product.name}</h4>
                  <p className="text-sm text-black/50">{product.sales}</p>
                </div>
                <p className="font-bold text-brand">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
