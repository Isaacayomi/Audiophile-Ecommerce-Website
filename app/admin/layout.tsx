"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiLayout, 
  FiBox, 
  FiPlusSquare, 
  FiLogOut, 
  FiHome, 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiBell, 
  FiUser,
  FiSettings,
  FiChevronDown
} from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <FiLayout /> },
    { label: "Products", href: "/admin/products", icon: <FiBox /> },
    { label: "Add Product", href: "/admin/products/new", icon: <FiPlusSquare /> },
    { label: "Settings", href: "/admin/settings", icon: <FiSettings /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#0F172A] font-manrope text-white selection:bg-[#D87D4A]/30 overflow-x-hidden">
      {/* Sidebar Backdrop (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/5 bg-[#0F172A] transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-4 py-8">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-lg bg-[#D87D4A] flex items-center justify-center text-white shadow-[0_0_15px_rgba(216,125,74,0.4)]">
              <FiBox className="text-lg" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Audiophile<span className="text-[#D87D4A]">Admin</span>
            </span>
          </div>

          <nav className="flex-1 space-y-1">
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Main Menu</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center rounded-xl px-4 py-3 transition-all duration-200 group ${
                    isActive ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={`text-lg transition-colors duration-200 ${isActive ? "text-[#D87D4A]" : "group-hover:text-[#D87D4A]"}`}>
                    {item.icon}
                  </span>
                  <span className="ml-3 text-sm font-semibold">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D87D4A]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-1 border-t border-white/5 pt-6">
            <Link
              href="/"
              className="flex items-center rounded-xl px-4 py-3 text-white/50 transition-all hover:bg-white/5 hover:text-white group"
            >
              <span className="text-lg group-hover:text-[#D87D4A] transition-colors">
                <FiHome />
              </span>
              <span className="ml-3 text-sm font-semibold">Storefront</span>
            </Link>
            <button
              className="flex w-full items-center rounded-xl px-4 py-3 text-rose-400/70 transition-all hover:bg-rose-400/10 hover:text-rose-400 group"
            >
              <span className="text-lg transition-transform group-hover:scale-110">
                <FiLogOut />
              </span>
              <span className="ml-3 text-sm font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white lg:hidden"
            >
              <FiMenu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                placeholder="Search products, orders..." 
                className="h-10 w-64 rounded-xl bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/20 border border-white/5 focus:outline-none focus:border-[#D87D4A]/50 focus:bg-white/[0.08] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all">
              <FiBell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#F97316] ring-2 ring-[#0F172A]" />
            </button>
            
            <div className="h-8 w-px bg-white/5 hidden sm:block" />

            <div className="flex items-center gap-3 pl-1 cursor-pointer group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#D87D4A] to-[#FBAF85] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[rgba(216,125,74,0.2)]">
                JD
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-white group-hover:text-[#D87D4A] transition-colors">John Doe</p>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Store Admin</p>
              </div>
              <FiChevronDown className="text-white/30 group-hover:text-white transition-colors" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 lg:p-10">
          <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
              {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
