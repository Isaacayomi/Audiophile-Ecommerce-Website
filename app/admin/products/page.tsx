"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiCopy,
  FiEdit2,
  FiExternalLink,
  FiFilter,
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { categories as storefrontCategories } from "../../lib/products";
import { formatCurrency, getAdminImageSource } from "../_lib/catalog";
import { useAdminCatalog } from "../_components/AdminCatalogProvider";
import { useDelayedBoolean } from "../_components/useDelayedBoolean";
import type { AppDispatch, RootState } from "../../store/store";
import {
  setAdminProductCategory,
  setAdminProductQuery,
} from "../../store/adminUi/adminUiSlice";
import type { Category } from "../../type";
import { ProductsSkeleton } from "../_components/ProductsSkeleton";

const statusClasses = {
  Live: "bg-emerald-500/10 text-emerald-400",
  Draft: "bg-amber-500/10 text-amber-300",
  Hidden: "bg-rose-500/10 text-rose-400",
} as const;

type PendingCatalogAction = {
  type: PendingCatalogActionType;
  slug: string;
} | null;

type PendingCatalogActionType = "edit" | "copy" | "delete";

export default function ProductManagement() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products, deleteProduct, duplicateProduct, isHydrated } =
    useAdminCatalog();

  const [pendingAction, setPendingAction] =
    useState<PendingCatalogAction>(null);
  const showPendingActionSpinner = useDelayedBoolean(Boolean(pendingAction));
  const query = useSelector(
    (state: RootState) => state.adminUi.productFilter.query,
  );
  const category = useSelector(
    (state: RootState) => state.adminUi.productFilter.category,
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.slug.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  const isPendingAction = (type: PendingCatalogActionType, slug: string) =>
    pendingAction?.type === type && pendingAction.slug === slug;

  const isActionBusy = (type: PendingCatalogActionType, slug: string) =>
    isPendingAction(type, slug) && showPendingActionSpinner;

  const handleEdit = (slug: string) => {
    if (pendingAction) return;
    setPendingAction({ type: "edit", slug });
    router.push(`/admin/products/new?edit=${slug}`);
  };

  const handleCopy = async (slug: string) => {
    if (pendingAction) return;
    setPendingAction({ type: "copy", slug });

    try {
      await duplicateProduct(slug);
    } finally {
      setPendingAction(null);
    }
  };

  const handleDelete = async (slug: string) => {
    if (pendingAction) return;
    setPendingAction({ type: "delete", slug });

    try {
      await deleteProduct(slug);
    } finally {
      setPendingAction(null);
    }
  };

  if (!isHydrated) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Product Catalog
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage Audiophile headphones, speakers, and earphones from one
            place.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D87D4A] px-6 text-xs font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)] transition-all hover:bg-[#FBAF85]"
        >
          <FiPlus size={16} />
          Add Product
        </Link>
      </header>

      <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={query}
            onChange={(event) =>
              dispatch(setAdminProductQuery(event.target.value))
            }
            placeholder="Search products or slugs"
            className="h-11 w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/8"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 text-xs font-bold text-white/60">
            <FiFilter size={14} className="text-[#D87D4A]" />
            <select
              value={category}
              onChange={(event) =>
                dispatch(
                  setAdminProductCategory(
                    event.target.value as "all" | Category,
                  ),
                )
              }
              className="bg-transparent outline-none"
            >
              <option value="all" className="bg-[#0F172A]">
                All categories
              </option>
              {storefrontCategories.map((item) => (
                <option
                  key={item.slug}
                  value={item.slug}
                  className="bg-[#0F172A]"
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {filteredProducts.map((product, index) => (
          <motion.article
            key={product.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-white/5 bg-white/3 p-4"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-black/50">
                {getAdminImageSource(product) ? (
                  <Image
                    src={getAdminImageSource(product)}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/3 text-[8px] font-bold uppercase tracking-widest text-white/20">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-white/25">
                      {product.slug}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${statusClasses[product.status]}`}
                  >
                    {product.status}
                  </span>
                </div>
                <p className="mt-3 text-xs text-white/50">
                  {product.category} - {formatCurrency(product.price)} -{" "}
                  {product.stock} units
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <Link
                    href={product.storefrontPath}
                    className="inline-flex items-center gap-1 text-[#D87D4A] hover:underline"
                  >
                    View storefront <FiExternalLink />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(product.slug)}
                disabled={Boolean(pendingAction)}
                className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isActionBusy("edit", product.slug) ? (
                  <>
                    <FiRefreshCw className="mr-2 animate-spin" size={12} />
                    Opening...
                  </>
                ) : (
                  "Edit"
                )}
              </button>
              <button
                type="button"
                onClick={() => handleCopy(product.slug)}
                disabled={Boolean(pendingAction)}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isActionBusy("copy", product.slug) ? (
                  <>
                    <FiRefreshCw className="mr-2 animate-spin" size={12} />
                    Copying...
                  </>
                ) : (
                  "Copy"
                )}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product.slug)}
                disabled={Boolean(pendingAction)}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:bg-rose-500/10 hover:text-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isActionBusy("delete", product.slug) ? (
                  <>
                    <FiRefreshCw className="mr-2 animate-spin" size={12} />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-separate border-spacing-y-3 text-left">
          <thead>
            <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              <th className="px-6 py-2">Product Details</th>
              <th className="px-6 py-2">Category</th>
              <th className="px-6 py-2">Price</th>
              <th className="px-6 py-2">Stock</th>
              <th className="px-6 py-2 text-center">Status</th>
              <th className="px-6 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <motion.tr
                key={product.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="group bg-white/2 transition-colors hover:bg-white/5"
              >
                <td className="rounded-l-2xl px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/5 bg-black">
                      {getAdminImageSource(product) ? (
                        <Image
                          src={getAdminImageSource(product)}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-white/3 text-[8px] font-bold uppercase tracking-widest text-white/20">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-white group-hover:text-[#D87D4A]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/20">
                        {product.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-white/60">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-xs font-bold text-white">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full ${
                          product.stock < 15 ? "bg-rose-500" : "bg-[#D87D4A]"
                        }`}
                        style={{ width: `${Math.min(product.stock, 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white/40">
                      {product.stock} units
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${statusClasses[product.status]}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="rounded-r-2xl px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product.slug)}
                      disabled={Boolean(pendingAction)}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white/5 text-white/20 transition-all hover:bg-[#D87D4A]/20 hover:text-[#D87D4A] disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label={`Edit ${product.name}`}
                    >
                      {isActionBusy("edit", product.slug) ? (
                        <FiRefreshCw size={16} className="animate-spin" />
                      ) : (
                        <FiEdit2 size={16} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(product.slug)}
                      disabled={Boolean(pendingAction)}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white/5 text-white/20 transition-all hover:bg-emerald-500/20 hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label={`Duplicate ${product.name}`}
                    >
                      {isActionBusy("copy", product.slug) ? (
                        <FiRefreshCw size={16} className="animate-spin" />
                      ) : (
                        <FiCopy size={16} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.slug)}
                      disabled={Boolean(pendingAction)}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white/5 text-white/20 transition-all hover:bg-rose-500/20 hover:text-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label={`Delete ${product.name}`}
                    >
                      {isActionBusy("delete", product.slug) ? (
                        <FiRefreshCw size={16} className="animate-spin" />
                      ) : (
                        <FiTrash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 p-10 text-center">
          <p className="text-sm font-bold text-white">No products found</p>
          <p className="mt-2 text-sm text-white/40">
            Try another search term or add a new product to the catalog.
          </p>
        </div>
      )}
    </div>
  );
}
