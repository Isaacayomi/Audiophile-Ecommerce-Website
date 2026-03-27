import React from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import Image from "next/image";

export default function ProductManagement() {
  const products = [
    {
      id: 1,
      name: "XX99 Mark II Headphones",
      category: "Headphones",
      price: "$2,999",
      stock: 45,
      image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
    },
    {
      id: 2,
      name: "ZX9 Speaker",
      category: "Speakers",
      price: "$4,500",
      stock: 12,
      image: "/assets/product-zx9-speaker/desktop/image-product.jpg",
    },
    {
        id: 3,
        name: "YX1 Earphones",
        category: "Earphones",
        price: "$599",
        stock: 89,
        image: "/assets/product-yx1-earphones/desktop/image-product.jpg",
    },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-display font-bold tracking-tight text-white">Product <span className="text-white/40 font-medium">Catalog</span></h1>
          <p className="mt-2 text-copy font-medium text-white/40">Manage your audio equipment inventory and pricing.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 text-label font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-hover hover:scale-105 active:scale-95 shadow-lg shadow-brand/20"
        >
          <FiPlus size={20} />
          Add New Product
        </Link>
      </header>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 outline-none transition-all focus:border-brand/50 focus:bg-white/10"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white/60">
            <FiFilter className="text-brand" />
            <select className="bg-transparent outline-none cursor-pointer font-bold text-sm">
                <option className="bg-[#121212]">All Categories</option>
                <option className="bg-[#121212]">Headphones</option>
                <option className="bg-[#121212]">Speakers</option>
                <option className="bg-[#121212]">Earphones</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-white/5 bg-white/5 text-label font-bold uppercase tracking-widest text-white/30">
                <th className="px-8 py-5">Product Details</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Availability</th>
                <th className="px-8 py-5 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                <tr key={product.id} className="text-copy transition-all hover:bg-white/[0.03] group">
                    <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                        <div className="h-16 w-16 overflow-hidden rounded-xl bg-white/10 border border-white/10 p-1 transition-transform group-hover:scale-110">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover rounded-lg"
                        />
                        </div>
                        <div>
                            <span className="block font-bold text-white group-hover:text-brand transition-colors">{product.name}</span>
                            <span className="text-xs text-white/30 tracking-widest uppercase">ID: PRD-00{product.id}</span>
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-6">
                        <span className="px-3 py-1 rounded-lg bg-white/5 text-white/60 font-medium border border-white/5">
                            {product.category}
                        </span>
                    </td>
                    <td className="px-6 py-6 font-bold text-white">{product.price}</td>
                    <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${product.stock < 20 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className={`font-bold ${product.stock < 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {product.stock} in stock
                        </span>
                    </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all hover:bg-brand/20 hover:text-brand">
                        <FiEdit2 size={18} />
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all hover:bg-rose-500/20 hover:text-rose-400">
                        <FiTrash2 size={18} />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
