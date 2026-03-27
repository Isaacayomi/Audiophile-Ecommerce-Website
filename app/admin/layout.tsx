import React from "react";
import Link from "next/link";
import { FiLayout, FiBox, FiPlusSquare, FiLogOut, FiHome } from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <FiLayout /> },
    { label: "Products", href: "/admin/products", icon: <FiBox /> },
    { label: "Add Product", href: "/admin/products/new", icon: <FiPlusSquare /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B0B0B] font-manrope text-white selection:bg-brand/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-[#121212]">
        <div className="flex h-full flex-col px-4 py-6">
          <div className="mb-12 flex items-center px-2">
             <Link href="/" className="group flex items-center gap-2">
                <span className="text-heading-sm font-bold tracking-tight text-white transition-colors group-hover:text-brand">
                    AUDIOPHILE <span className="text-brand">ADMIN</span>
                </span>
             </Link>
          </div>

          <nav className="flex-1 space-y-1.5">
            <p className="mb-4 px-2 text-xs font-bold uppercase tracking-widest text-white/30">Menu</p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center rounded-xl px-4 py-3 text-white/60 transition-all hover:bg-white/5 hover:text-white group"
              >
                <span className="text-xl group-hover:text-brand transition-colors">
                  {item.icon}
                </span>
                <span className="ml-3 text-copy font-bold">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-1.5 border-t border-white/5 pt-6">
            <Link
              href="/"
              className="flex items-center rounded-xl px-4 py-3 text-white/60 transition-all hover:bg-white/5 hover:text-white group"
            >
              <span className="text-xl group-hover:text-brand transition-colors">
                <FiHome />
              </span>
              <span className="ml-3 text-copy font-bold">Back to Store</span>
            </Link>
            <button
              className="mt-2 flex w-full items-center rounded-xl px-4 py-3 text-red-400/80 transition-all hover:bg-red-500/10 hover:text-red-400 group"
            >
              <span className="text-xl transition-transform group-hover:scale-110">
                <FiLogOut />
              </span>
              <span className="ml-3 text-copy font-bold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 w-full min-h-screen">
        <div className="mx-auto max-w-6xl px-8 py-10">
            {children}
        </div>
      </main>
    </div>
  );
}
