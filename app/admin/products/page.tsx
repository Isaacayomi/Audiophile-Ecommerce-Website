"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiBox, FiChevronRight, FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";

export default function ProductManagement() {
  const products = [
    {
      id: "PRD-001",
      name: "XX99 Mark II Headphones",
      category: "Headphones",
      price: "$2,999",
      stock: 45,
      image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
      status: "Active"
    },
    {
      id: "PRD-002",
      name: "ZX9 Speaker",
      category: "Speakers",
      price: "$4,500",
      stock: 12,
      image: "/assets/product-zx9-speaker/desktop/image-product.jpg",
      status: "Low Stock"
    },
    {
        id: "PRD-003",
        name: "YX1 Earphones",
        category: "Earphones",
        price: "$599",
        stock: 89,
        image: "/assets/product-yx1-earphones/desktop/image-product.jpg",
        status: "Active"
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Product Catalog</h1>
          <p className="text-sm text-white/40 mt-1">Manage the Audiophile headphone, speaker, and earphone lineup.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D87D4A] px-6 text-xs font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)] hover:bg-[#FBAF85] transition-all"
        >
          <FiPlus size={16} />
          Add Product
        </Link>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Search products, orders..." 
            className="h-10 w-full rounded-xl bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/20 border border-white/5 focus:outline-none focus:border-[#D87D4A]/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-10 items-center gap-2 rounded-xl bg-white/5 px-4 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white border border-white/5 transition-all">
            <FiFilter size={14} />
            Filters
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-white/5 px-4 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white border border-white/5 transition-all">
            <FiBox size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              <th className="px-6 py-2">Product Details</th>
              <th className="px-6 py-2">Category</th>
              <th className="px-6 py-2">Price</th>
              <th className="px-6 py-2">Stock Level</th>
              <th className="px-6 py-2 text-center">Status</th>
              <th className="px-6 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <td className="rounded-l-2xl px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-black border border-white/5 p-1 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-[#D87D4A] transition-colors">{product.name}</p>
                      <p className="text-[10px] text-white/20 font-bold mt-1 uppercase tracking-widest">{product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-white/60 font-semibold">{product.category}</td>
                <td className="px-6 py-4 text-xs font-bold text-white">{product.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(product.stock, 100)}%` }}
                        className={`h-full rounded-full ${product.stock < 20 ? 'bg-rose-500' : 'bg-[#D87D4A]'}`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white/40">{product.stock} Units</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${
                    product.status === "Active" ? "bg-emerald-500/10 text-emerald-400" :
                    "bg-rose-500/10 text-rose-400"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="rounded-r-2xl px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:bg-[#D87D4A]/20 hover:text-[#D87D4A] transition-all">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:bg-rose-500/20 hover:text-rose-500 transition-all">
                      <FiTrash2 size={16} />
                    </button>
                    <button className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:bg-white/10 hover:text-white transition-all">
                      <FiMoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
