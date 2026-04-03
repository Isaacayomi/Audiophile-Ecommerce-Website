"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  FiBell,
  FiBox,
  FiChevronDown,
  FiHome,
  FiLayout,
  FiLogOut,
  FiMenu,
  FiPlusSquare,
  FiSearch,
  FiSettings,
} from "react-icons/fi";
import { AdminCatalogProvider } from "./_components/AdminCatalogProvider";
import { useAdminIdentity } from "./_components/useAdminIdentity";
import { toggleAdminSidebar } from "../store/adminUi/adminUiSlice";
import { mergeAdminSettings } from "../store/adminCatalog/adminCatalogSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { displayName, initials, isLoaded } = useAdminIdentity();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.adminUi.sidebar.isOpen,
  );

  useEffect(() => {
    if (!isLoaded) return;

    dispatch(mergeAdminSettings({ adminName: displayName }));
  }, [dispatch, displayName, isLoaded]);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <FiLayout /> },
    { label: "Products", href: "/admin/products", icon: <FiBox /> },
    {
      label: "Add Product",
      href: "/admin/products/new",
      icon: <FiPlusSquare />,
    },
    { label: "Settings", href: "/admin/settings", icon: <FiSettings /> },
  ];

  return (
    <AdminCatalogProvider>
      <div className="flex min-h-screen overflow-x-hidden bg-[#0F172A] font-manrope text-white selection:bg-[#D87D4A]/30">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => dispatch(toggleAdminSidebar())}
            />
          )}
        </AnimatePresence>

        <aside
          className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/5 bg-[#0F172A] transition-all duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-4 py-8">
            <div className="mb-10 flex items-center gap-3 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D87D4A] text-white shadow-[0_0_15px_rgba(216,125,74,0.4)]">
                <FiBox className="text-lg" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight text-white">
                  Audiophile
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
                  Admin
                </span>
              </div>
            </div>

            <nav className="flex-1 space-y-1">
              <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Main Menu
              </p>
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => dispatch(toggleAdminSidebar())}
                    className={`group flex items-center rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`text-lg transition-colors duration-200 ${
                        isActive
                          ? "text-[#D87D4A]"
                          : "group-hover:text-[#D87D4A]"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="ml-3 text-sm font-semibold">
                      {item.label}
                    </span>
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
                className="group flex items-center rounded-xl px-4 py-3 text-white/50 transition-all hover:bg-white/5 hover:text-white"
              >
                <span className="text-lg transition-colors group-hover:text-[#D87D4A]">
                  <FiHome />
                </span>
                <span className="ml-3 text-sm font-semibold">Storefront</span>
              </Link>
              <button className="group flex w-full items-center rounded-xl px-4 py-3 text-rose-400/70 transition-all hover:bg-rose-400/10 hover:text-rose-400">
                <span className="text-lg transition-transform group-hover:scale-110">
                  <FiLogOut />
                </span>
                <span className="ml-3 text-sm font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col lg:ml-64">
          <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#0F172A]/80 px-4 backdrop-blur-md sm:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => dispatch(toggleAdminSidebar())}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white lg:hidden"
              >
                <FiMenu size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white">
                <FiBell size={18} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#F97316] ring-2 ring-[#0F172A]" />
              </button>

              <div className="hidden h-8 w-px bg-white/5 sm:block" />

              <div className="group flex cursor-pointer items-center gap-3 pl-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#D87D4A] to-[#FBAF85] text-sm font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)]">
                  {initials}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-white group-hover:text-[#D87D4A] transition-colors">
                    {displayName}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Store Admin
                  </p>
                </div>
                <FiChevronDown className="text-white/30 transition-colors group-hover:text-white" />
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
    </AdminCatalogProvider>
  );
}
