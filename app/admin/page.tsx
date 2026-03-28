"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiArrowUpRight,
  FiMoreHorizontal,
  FiActivity,
  FiTruck,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const StatCard = ({ title, value, icon, trend, isPositive, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06] hover:border-white/10"
  >
    <div className="flex items-start justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D87D4A]/10 text-[#D87D4A]">
        <span className="text-xl">{icon}</span>
      </div>
      <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
        {isPositive ? "+" : ""}{trend}
        <FiArrowUpRight className={isPositive ? "" : "rotate-90"} />
      </div>
    </div>
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-widest text-white/30">{title}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-white">{value}</p>
    </div>
    {/* Subtle gradient background */}
    <div className="absolute -right-8 -bottom-8 h-24 w-24 bg-[#D87D4A]/5 blur-3xl rounded-full" />
  </motion.div>
);

export default function AdminDashboard() {
  const recentOrders = [
    { id: "ORD-7721", customer: "Alex Rivera", product: "XX99 Mark II", status: "Delivered", amount: "$2,999", time: "2m ago" },
    { id: "ORD-7720", customer: "Sarah Chen", product: "ZX7 Speaker", status: "In Transit", amount: "$3,500", time: "15m ago" },
    { id: "ORD-7719", customer: "James Wilson", product: "YX1 Earphones", status: "Pending", amount: "$599", time: "1h ago" },
    { id: "ORD-7718", customer: "Elena Gomez", product: "XX59 Headphones", status: "Delivered", amount: "$899", time: "3h ago" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Store Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">Welcome back, John. Here&apos;s what&apos;s moving across Audiophile today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-[#0F172A] bg-white/10" />
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-[#0F172A] bg-[#D87D4A] flex items-center justify-center text-[10px] font-bold text-white">
              +12
            </div>
          </div>
          <button className="rounded-xl bg-[#D87D4A] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)] hover:bg-[#FBAF85] transition-all">
            Add Product
          </button>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$128,430" icon={<FiDollarSign />} trend="12.5%" isPositive={true} delay={0.1} />
        <StatCard title="Active Orders" value="456" icon={<FiTruck />} trend="8.1%" isPositive={true} delay={0.2} />
        <StatCard title="New Customers" value="2,345" icon={<FiUsers />} trend="5.2%" isPositive={true} delay={0.3} />
        <StatCard title="Success Rate" value="98.4%" icon={<FiCheckCircle />} trend="1.2%" isPositive={false} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
            <h3 className="text-sm font-bold text-white">Performance Analytics</h3>
            <p className="text-xs text-white/30 mt-1">Order volume vs revenue trend</p>
          </div>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold text-white/60 focus:outline-none focus:border-[#D87D4A]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="flex items-end gap-3 h-48 px-2">
            {[45, 60, 40, 85, 55, 75, 90, 65, 80, 50, 70, 95].map((h, i) => (
              <div key={i} className="group relative flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                  className="w-full rounded-t-sm bg-gradient-to-t from-[#D87D4A]/20 to-[#D87D4A] transition-all group-hover:to-[#FBAF85] group-hover:shadow-[0_0_15px_rgba(216,125,74,0.3)]"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-white px-1.5 py-0.5 text-[8px] font-bold text-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t border-white/5 pt-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#D87D4A]" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#FBAF85]" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Target</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-[#D87D4A] uppercase tracking-widest cursor-pointer hover:underline">View Sales Report</p>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
          <h3 className="text-sm font-bold text-white mb-6">Real-time Activity</h3>
          <div className="space-y-6">
            {[ 
              { icon: <FiActivity />, color: "text-[#D87D4A]", title: "New Order", desc: "ORD-7721 placed", time: "2m ago" },
              { icon: <FiTruck />, color: "text-[#FBAF85]", title: "Out for Delivery", desc: "ORD-7718 in transit", time: "15m ago" },
              { icon: <FiCheckCircle />, color: "text-emerald-400", title: "Delivery Success", desc: "ORD-7715 delivered", time: "1h ago" },
              { icon: <FiClock />, color: "text-amber-400", title: "Delayed", desc: "ORD-7712 pending", time: "3h ago" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-white truncate">{item.title}</p>
                    <span className="text-[9px] font-bold text-white/20 whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-[10px] text-white/40 mt-0.5 truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full rounded-xl border border-white/5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:bg-white/5 hover:text-white transition-all">
            View All Updates
          </button>
        </div>
      </div>

      {/* Detailed Orders Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Orders</h2>
          <button className="text-[10px] font-bold uppercase tracking-widest text-[#D87D4A] hover:underline">Manage All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                <th className="px-6 py-2">ID</th>
                <th className="px-6 py-2">Customer</th>
                <th className="px-6 py-2">Product</th>
                <th className="px-6 py-2 text-center">Status</th>
                <th className="px-6 py-2 text-right">Amount</th>
                <th className="px-6 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="group bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <td className="rounded-l-xl px-6 py-4 text-xs font-bold text-[#D87D4A]">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold text-white">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/60">{order.product}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${
                      order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" :
                      order.status === "In Transit" ? "bg-[#D87D4A]/10 text-[#D87D4A]" :
                      "bg-amber-500/10 text-amber-400"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-xs font-bold text-white">{order.amount}</td>
                  <td className="rounded-r-xl px-6 py-4 text-right">
                    <button className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:bg-white/10 hover:text-white transition-all">
                      <FiMoreHorizontal />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
