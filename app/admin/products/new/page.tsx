"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiUploadCloud,
  FiX,
  FiCheckCircle,
  FiInfo,
  FiImage,
  FiSettings,
  FiPlusSquare,
  FiChevronDown,
} from "react-icons/fi";

const brand = "#D87D4A";

const FormInput = ({ label, placeholder, type = "text", ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:bg-white/[0.08] focus:border-[#D87D4A]/50"
      {...props}
    />
  </div>
);

const CardSection = ({ children, title, icon, className, delay = 0 }: any) => (
  <motion.section
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`rounded-2xl border border-white/5 bg-white/[0.02] p-6 ${className}`}
  >
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D87D4A]/10 text-[#D87D4A]">
        {icon}
      </div>
      <h2 className="text-sm font-bold text-white uppercase tracking-widest">
        {title}
      </h2>
    </div>
    {children}
  </motion.section>
);

export default function NewProduct() {
  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white border border-white/5"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Add New Audio Product</h1>
            <p className="mt-1 text-xs text-white/40">
              Add a headphone, speaker, or earphone to the Audiophile catalog.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-10 rounded-xl border border-white/5 bg-white/5 px-6 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all">
            Save Draft
          </button>
          <button
            className="h-10 rounded-xl px-8 text-xs font-bold text-white shadow-lg transition-all"
            style={{ backgroundColor: brand, boxShadow: "0 18px 35px rgba(216, 125, 74, 0.22)" }}
          >
            Publish to Store
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardSection
          title="Product Details"
          icon={<FiInfo />}
          className="lg:col-span-2"
          delay={0.1}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              label="Product Name"
              placeholder="e.g. XX99 Mark II Headphones"
            />
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                Category
              </label>
              <div className="relative">
                <select className="w-full appearance-none rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:bg-white/[0.08] cursor-pointer">
                  <option className="bg-[#0F172A]">Headphones</option>
                  <option className="bg-[#0F172A]">Speakers</option>
                  <option className="bg-[#0F172A]">Earphones</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                  <FiChevronDown size={14} />
                </div>
              </div>
            </div>
            <FormInput label="Retail Price ($)" type="number" placeholder="2999" />
            <FormInput
              label="Initial Inventory"
              type="number"
              placeholder="100"
            />
          </div>
          <div className="mt-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                Product Copy
              </label>
              <textarea
                rows={4}
                placeholder="Write a concise Audiophile description that highlights sound, design, and build quality..."
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:bg-white/[0.08] resize-none"
              />
            </div>
          </div>
        </CardSection>

        <div className="space-y-6">
          <CardSection title="Product Images" icon={<FiImage />} delay={0.2}>
            <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.01] p-10 text-center transition-all hover:border-[#D87D4A]/40 hover:bg-[#D87D4A]/5 cursor-pointer">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-white/20 transition-all group-hover:scale-110 group-hover:bg-[#D87D4A]/20 group-hover:text-[#D87D4A]">
                <FiUploadCloud size={24} />
              </div>
              <p className="text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                Upload product images
              </p>
              <p className="mt-1 text-[9px] font-bold text-white/10 uppercase tracking-widest">
                PNG or JPG, up to 10MB each
              </p>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-white/5 border border-white/5"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
                    <FiX
                      className="text-white cursor-pointer hover:scale-125 transition-transform"
                      size={16}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardSection>

          <CardSection title="Visibility" icon={<FiSettings />} delay={0.3}>
            <div className="space-y-4">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D87D4A] transition-all">
                  <input
                    type="radio"
                    name="status"
                    className="peer absolute h-full w-full opacity-0 cursor-pointer"
                    defaultChecked
                  />
                  <div className="h-2 w-2 rounded-full bg-[#D87D4A] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-[#D87D4A] transition-colors">
                    Live in store
                  </p>
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    Available to customers
                  </p>
                </div>
              </label>
              <div className="h-px bg-white/5" />
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/10 transition-all">
                  <input
                    type="radio"
                    name="status"
                    className="peer absolute h-full w-full opacity-0 cursor-pointer"
                  />
                  <div className="h-2 w-2 rounded-full bg-[#D87D4A] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-[#D87D4A] transition-colors">
                    Hidden for now
                  </p>
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    Keep it private until ready
                  </p>
                </div>
              </label>
            </div>
          </CardSection>
        </div>
      </div>
    </div>
  );
}
