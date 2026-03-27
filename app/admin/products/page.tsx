import React from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-lg font-bold tracking-heading text-black">Product Management</h1>
          <p className="text-copy font-medium text-black/50">View and manage your product catalog.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
        >
          <FiPlus />
          Add Product
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-lg border border-line bg-surface-muted py-2 pl-10 pr-4 outline-none transition-focus focus:border-brand"
          />
        </div>
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-line bg-surface-muted px-4 py-2 outline-none">
            <option>All Categories</option>
            <option>Headphones</option>
            <option>Speakers</option>
            <option>Earphones</option>
          </select>
          <select className="rounded-lg border border-line bg-surface-muted px-4 py-2 outline-none">
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-surface-muted">
            <tr className="border-b border-line text-label font-bold uppercase text-black/50">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((product) => (
              <tr key={product.id} className="text-copy transition-colors hover:bg-surface-muted/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-surface">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-bold text-black">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-black/50">{product.category}</td>
                <td className="px-6 py-4 font-bold text-black">{product.price}</td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${product.stock < 20 ? 'text-red-500' : 'text-black/50'}`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg p-2 text-black/50 transition-colors hover:bg-surface hover:text-brand">
                      <FiEdit2 size={18} />
                    </button>
                    <button className="rounded-lg p-2 text-black/50 transition-colors hover:bg-red-50 hover:text-red-500">
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
  );
}
