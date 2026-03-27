import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiUploadCloud, FiX, FiCheckCircle } from "react-icons/fi";

const FormInput = ({ label, placeholder, type = "text", ...props }: any) => (
  <div className="flex flex-col gap-3">
    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder:text-white/20 outline-none transition-all focus:border-brand/50 focus:bg-white/10"
      {...props}
    />
  </div>
);

export default function NewProduct() {
  return (
    <div className="space-y-10 pb-20">
      <header className="flex items-center gap-6">
        <Link
          href="/admin/products"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all hover:bg-brand/20 hover:text-brand"
        >
          <FiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-display font-bold tracking-tight text-white">Create <span className="text-white/40 font-medium">New Product</span></h1>
          <p className="mt-1 text-copy font-medium text-white/40">Add a new premium audio device to your inventory.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-brand/20 flex items-center justify-center text-brand">
                    <FiCheckCircle size={18} />
                </div>
                <h2 className="text-heading-sm font-bold text-white">Basic Specification</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormInput label="Product Name" placeholder="e.g. XX99 Mark II Headphones" />
                <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Category</label>
                    <div className="relative">
                        <select className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-white outline-none transition-all focus:border-brand/50 focus:bg-white/10 cursor-pointer">
                            <option className="bg-[#121212]">Headphones</option>
                            <option className="bg-[#121212]">Speakers</option>
                            <option className="bg-[#121212]">Earphones</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                            <FiArrowLeft size={16} className="-rotate-90" />
                        </div>
                    </div>
                </div>
                <FormInput label="Unit Price ($)" type="number" placeholder="2999" />
                <FormInput label="Available Stock" type="number" placeholder="100" />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Product Description</label>
                <textarea
                rows={5}
                placeholder="Write a compelling description for the product..."
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder:text-white/20 outline-none transition-all focus:border-brand/50 focus:bg-white/10 resize-none"
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Key Features</label>
                <textarea
                rows={5}
                placeholder="List the technical features (one per line)..."
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder:text-white/20 outline-none transition-all focus:border-brand/50 focus:bg-white/10 resize-none"
                />
            </div>
          </section>
        </div>

        {/* Right Column: Images & Actions */}
        <div className="space-y-8">
          <section className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm space-y-6">
            <h2 className="text-heading-sm font-bold text-white">Visual Assets</h2>
            <div className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] p-10 text-center transition-all hover:border-brand hover:bg-brand/5 cursor-pointer">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/20 transition-all group-hover:scale-110 group-hover:bg-brand/20 group-hover:text-brand">
                <FiUploadCloud size={32} />
              </div>
              <p className="text-copy font-bold text-white/60">
                <span className="text-brand">Click to upload</span>
              </p>
              <p className="mt-1 text-xs text-white/20 uppercase tracking-widest">PNG, JPG up to 10MB</p>
            </div>

            {/* Placeholder for uploaded images */}
            <div className="grid grid-cols-3 gap-3">
                {[1, 2].map(i => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-white/10 group border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
                            <FiX className="text-white cursor-pointer hover:scale-125 transition-transform" size={20} />
                        </div>
                    </div>
                ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm space-y-6">
             <h2 className="text-heading-sm font-bold text-white">Publish Settings</h2>
             <div className="space-y-4">
                <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand ring-offset-2 ring-offset-[#0B0B0B] transition-all">
                        <input type="radio" name="status" className="peer absolute h-full w-full opacity-0 cursor-pointer" defaultChecked />
                        <div className="h-2.5 w-2.5 rounded-full bg-brand opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-copy font-bold text-white/60 group-hover:text-white transition-colors">Public Storefront</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/20 ring-offset-2 ring-offset-[#0B0B0B] transition-all peer-checked:border-brand">
                        <input type="radio" name="status" className="peer absolute h-full w-full opacity-0 cursor-pointer" />
                        <div className="h-2.5 w-2.5 rounded-full bg-brand opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-copy font-bold text-white/60 group-hover:text-white transition-colors">Save as Draft</span>
                </label>
             </div>
          </section>

          <div className="flex gap-4">
            <button className="flex-1 rounded-xl border border-white/10 bg-white/5 py-4 text-label font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
              Cancel
            </button>
            <button className="flex-1 rounded-xl bg-brand py-4 text-label font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-hover hover:scale-105 active:scale-95 shadow-lg shadow-brand/20">
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
