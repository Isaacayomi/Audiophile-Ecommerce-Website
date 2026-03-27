import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiUploadCloud, FiX } from "react-icons/fi";

const FormInput = ({ label, placeholder, type = "text", ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-label font-bold text-black uppercase">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="rounded-lg border border-line bg-white px-4 py-3 text-copy outline-none transition-focus focus:border-brand"
      {...props}
    />
  </div>
);

export default function NewProduct() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="rounded-lg p-2 text-black/50 transition-colors hover:bg-surface hover:text-brand"
        >
          <FiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-heading-lg font-bold tracking-heading text-black">Add New Product</h1>
          <p className="text-copy font-medium text-black/50">Enter the details of the new product.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-2 space-y-6 rounded-xl border border-line bg-white p-6 shadow-sm">
          <h2 className="text-heading-sm font-bold text-black">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput label="Product Name" placeholder="e.g. XX99 Mark II Headphones" />
            <div className="flex flex-col gap-2">
                <label className="text-label font-bold text-black uppercase">Category</label>
                <select className="rounded-lg border border-line bg-white px-4 py-3 text-copy outline-none transition-focus focus:border-brand">
                    <option>Headphones</option>
                    <option>Speakers</option>
                    <option>Earphones</option>
                </select>
            </div>
            <FormInput label="Price ($)" type="number" placeholder="2999" />
            <FormInput label="Stock Quantity" type="number" placeholder="100" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label font-bold text-black uppercase">Description</label>
            <textarea
              rows={5}
              placeholder="Tell us about the product..."
              className="rounded-lg border border-line bg-white px-4 py-3 text-copy outline-none transition-focus focus:border-brand resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label font-bold text-black uppercase">Features</label>
            <textarea
              rows={5}
              placeholder="List the key features..."
              className="rounded-lg border border-line bg-white px-4 py-3 text-copy outline-none transition-focus focus:border-brand resize-none"
            />
          </div>
        </div>

        {/* Right Column: Images & Actions */}
        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-heading-sm font-bold text-black">Product Media</h2>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-line bg-surface-muted p-8 text-center transition-colors hover:border-brand">
              <FiUploadCloud size={48} className="mb-4 text-black/25" />
              <p className="text-copy font-medium text-black/50">
                <span className="font-bold text-brand underline cursor-pointer">Click to upload</span> or drag and drop
              </p>
              <p className="mt-2 text-xs text-black/25">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>

            {/* Placeholder for uploaded images */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                {[1, 2].map(i => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-surface group">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <FiX className="text-white cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
             <h2 className="mb-4 text-heading-sm font-bold text-black">Visibility</h2>
             <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="status" className="h-4 w-4 text-brand" defaultChecked />
                    <span className="text-copy font-medium text-black">Public</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="status" className="h-4 w-4 text-brand" />
                    <span className="text-copy font-medium text-black">Draft</span>
                </label>
             </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 rounded-lg border border-line bg-white py-3 text-label font-bold uppercase tracking-copy text-black transition-colors hover:bg-surface">
              Cancel
            </button>
            <button className="flex-1 rounded-lg bg-brand py-3 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover">
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
