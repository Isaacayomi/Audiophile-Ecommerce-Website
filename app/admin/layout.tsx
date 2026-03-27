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
    <div className="flex min-h-screen bg-surface-muted font-manrope">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-line bg-white">
        <div className="flex h-full flex-col px-3 py-4">
          <div className="mb-10 flex items-center px-4 pt-4">
             <Link href="/" className="flex items-center gap-2">
                <span className="text-heading-sm font-bold tracking-tight text-black">
                    AUDIOPHILE <span className="text-brand">ADMIN</span>
                </span>
             </Link>
          </div>
          <ul className="space-y-2 font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center rounded-lg p-3 text-black transition-colors hover:bg-surface group"
                >
                  <span className="text-xl text-black/50 group-hover:text-brand transition-colors">
                    {item.icon}
                  </span>
                  <span className="ml-3 text-copy font-bold">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-line pt-4">
            <Link
              href="/"
              className="flex items-center rounded-lg p-3 text-black transition-colors hover:bg-surface group"
            >
              <span className="text-xl text-black/50 group-hover:text-brand transition-colors">
                <FiHome />
              </span>
              <span className="ml-3 text-copy font-bold">Back to Store</span>
            </Link>
            <button
              className="mt-2 flex w-full items-center rounded-lg p-3 text-red-500 transition-colors hover:bg-red-50 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                <FiLogOut />
              </span>
              <span className="ml-3 text-copy font-bold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 w-full p-8">
        <div className="mx-auto max-w-6xl">
            {children}
        </div>
      </main>
    </div>
  );
}
