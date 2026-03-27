import React from "react";
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign } from "react-icons/fi";

const DashboardCard = ({ title, value, icon, trend, color }: any) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="relative flex items-center justify-between">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} shadow-lg`}>
        <span className="text-xl text-white">{icon}</span>
      </div>
      <span className={`text-sm font-bold px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {trend}
      </span>
    </div>
    <div className="relative mt-6">
        <h3 className="text-copy font-bold uppercase tracking-widest text-white/40">{title}</h3>
        <p className="mt-2 text-heading-lg font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const stats = [
    { title: "Revenue", value: "$128,430", icon: <FiDollarSign />, trend: "+12.5%", color: "bg-brand" },
    { title: "Total Orders", value: "456", icon: <FiShoppingBag />, trend: "+5.2%", color: "bg-blue-500" },
    { title: "Customers", value: "2,345", icon: <FiUsers />, trend: "+8.1%", color: "bg-purple-500" },
    { title: "Conv. Rate", value: "3.4%", icon: <FiTrendingUp />, trend: "-1.2%", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-display font-bold tracking-tight text-white">Analytics <span className="text-white/40 font-medium">Dashboard</span></h1>
        <p className="mt-2 text-copy font-medium text-white/40">Real-time overview of your store&apos;s performance metrics.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-heading-sm font-bold text-white">Recent Transactions</h2>
            <button className="text-label font-bold uppercase tracking-widest text-brand hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-label font-bold uppercase tracking-widest text-white/30">
                  <th className="pb-4 pr-4">Order ID</th>
                  <th className="pb-4 pr-4">Customer</th>
                  <th className="pb-4 pr-4 text-center">Status</th>
                  <th className="pb-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="text-copy group hover:bg-white/[0.02]">
                    <td className="py-5 pr-4 font-bold text-white/80 group-hover:text-white transition-colors">#ORD-00{i}</td>
                    <td className="py-5 pr-4 text-white/60">John Doe</td>
                    <td className="py-5 pr-4 text-center">
                      <span className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                        Completed
                      </span>
                    </td>
                    <td className="py-5 text-right font-bold text-white">$2,999</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-heading-sm font-bold text-white">Top Performance</h2>
             <button className="text-label font-bold uppercase tracking-widest text-brand hover:underline">Full Catalog</button>
          </div>
          <div className="space-y-6">
            {[
              { name: "XX99 Mark II Headphones", sales: "124 sales", price: "$2,999", color: "bg-brand/20" },
              { name: "ZX9 Speaker", sales: "89 sales", price: "$4,500", color: "bg-white/10" },
              { name: "YX1 Wireless Earphones", sales: "72 sales", price: "$599", color: "bg-brand/20" },
              { name: "ZX7 Speaker", sales: "54 sales", price: "$3,500", color: "bg-white/10" },
            ].map((product) => (
              <div key={product.name} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl ${product.color} flex items-center justify-center font-bold text-white`}>
                        {product.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-white/90 group-hover:text-white transition-colors">{product.name}</h4>
                        <p className="text-sm text-white/40 tracking-wider">{product.sales}</p>
                    </div>
                </div>
                <p className="font-bold text-brand group-hover:scale-110 transition-transform">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
