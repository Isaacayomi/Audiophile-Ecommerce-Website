"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiChevronDown,
  FiImage,
  FiInfo,
  FiPackage,
  FiRefreshCw,
  FiSave,
  FiSettings,
  FiUploadCloud,
} from "react-icons/fi";
import { categories as storefrontCategories } from "../../../lib/products";
import { formatCurrency, slugify } from "../../_lib/catalog";
import { useAdminCatalog } from "../../_components/AdminCatalogProvider";
import type { Category } from "../../../type";
import type { CatalogStatus } from "../../../lib/catalog-types";

type SaveMode = CatalogStatus;

type ProductFormState = {
  name: string;
  shortName: string;
  category: Category;
  price: string;
  stock: string;
  status: SaveMode;
  featured: boolean;
  description: string;
  image: string;
};

const createEmptyForm = (): ProductFormState => ({
  name: "",
  shortName: "",
  category: "headphones",
  price: "2999",
  stock: "25",
  status: "Draft",
  featured: false,
  description:
    "Write a concise Audiophile description that highlights sound, design, and build quality.",
  image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
});

const SectionCard = ({
  title,
  description,
  icon,
  children,
  className = "",
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className={`rounded-2xl border border-white/5 bg-white/[0.02] p-6 ${className}`}
  >
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D87D4A]/10 text-[#D87D4A]">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">
          {title}
        </h2>
        <p className="mt-1 text-xs text-white/30">{description}</p>
      </div>
    </div>
    {children}
  </motion.section>
);

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
    {children}
  </label>
);

export default function NewProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit");
  const { getProductBySlug, upsertProduct, syncCatalog, isSyncing } =
    useAdminCatalog();

  const [form, setForm] = useState<ProductFormState>(createEmptyForm());
  const [saveMode, setSaveMode] = useState<SaveMode>("Draft");
  const pendingSaveMode = useRef<SaveMode>("Draft");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    // When we open this screen with `?edit=slug`, we hydrate the fields from
    // the shared admin catalog instead of forcing a separate edit page.
    if (!editSlug) return;

    const product = getProductBySlug(editSlug);

    if (!product) return;

    setForm({
      name: product.name,
      shortName: product.shortName,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      status: product.status,
      featured: product.featured,
      description: product.description,
      image: product.image,
    });
    setSaveMode(product.status);
    pendingSaveMode.current = product.status;
  }, [editSlug, getProductBySlug]);

  const productSlug = useMemo(
    () => slugify(form.name || "new-product"),
    [form.name],
  );

  const storefrontPath = useMemo(
    () => `/${form.category}/${productSlug}`,
    [form.category, productSlug],
  );

  const updateField = <K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    // We convert the selected image into a data URL so the admin preview and
    // local catalog can show it immediately without a separate upload backend.
    setIsUploadingImage(true);
    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        updateField("image", result);
      }
      setIsUploadingImage(false);
    };

    reader.onerror = () => {
      setIsUploadingImage(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    // The dashboard keeps the same catalog data shape across pages, so saving
    // here immediately updates the Products screen and the Dashboard overview.
    const saved = await upsertProduct({
      slug: productSlug,
      name: form.name.trim(),
      shortName: form.shortName.trim() || form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      status: pendingSaveMode.current,
      featured: form.featured,
      image: form.image.trim(),
      description: form.description.trim(),
      storefrontPath,
    });

    if (saved) {
      router.push("/admin/products");
    }
  };

  return (
    <form className="space-y-8 pb-20" onSubmit={handleSubmit}>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {editSlug ? "Edit Product" : "Add Product"}
            </h1>
            <p className="mt-1 text-xs text-white/40">
              {editSlug
                ? "Update the Audiophile catalog entry and keep the storefront in sync."
                : "Create a new catalog item that will be saved across the admin dashboard."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={syncCatalog}
            disabled={isSyncing}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 text-xs font-bold text-white/60 transition-all hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw className={isSyncing ? "animate-spin" : ""} />
            Sync Catalog
          </button>
          <button
            type="submit"
            onClick={() => {
              pendingSaveMode.current = "Draft";
              setSaveMode("Draft");
            }}
            className={`h-10 rounded-xl border px-6 text-xs font-bold transition-all ${
              saveMode === "Draft"
                ? "border-white/10 bg-white/10 text-white"
                : "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            Save Draft
          </button>
          <button
            type="submit"
            onClick={() => {
              pendingSaveMode.current = "Live";
              setSaveMode("Live");
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#D87D4A] px-8 text-xs font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)] transition-all hover:bg-[#FBAF85]"
          >
            <FiSave />
            Publish to Store
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SectionCard
          title="Product Details"
          description="Core product fields used across the catalog and storefront."
          icon={<FiInfo />}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel>Product Name</FieldLabel>
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="e.g. XX99 Mark II Headphones"
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/[0.08]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Short Name</FieldLabel>
              <input
                value={form.shortName}
                onChange={(event) => updateField("shortName", event.target.value)}
                placeholder="e.g. XX99 MK II"
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/[0.08]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Category</FieldLabel>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value as Category)
                  }
                  className="w-full appearance-none rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/[0.08] cursor-pointer"
                >
                  {storefrontCategories.map((item) => (
                    <option key={item.slug} value={item.slug} className="bg-[#0F172A]">
                      {item.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Price</FieldLabel>
              <input
                type="number"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/[0.08]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Stock</FieldLabel>
              <input
                type="number"
                value={form.stock}
                onChange={(event) => updateField("stock", event.target.value)}
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/[0.08]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Storefront Slug</FieldLabel>
              <input
                value={productSlug}
                readOnly
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/60 outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <FieldLabel>Description</FieldLabel>
            <textarea
              rows={5}
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              className="resize-none rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/[0.08]"
            />
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard
            title="Product Media"
            description="Upload an image for the admin catalog preview."
            icon={<FiImage />}
          >
            <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.01] p-8 text-center transition-all hover:border-[#D87D4A]/40 hover:bg-[#D87D4A]/5">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-white/20 transition-all group-hover:bg-[#D87D4A]/20 group-hover:text-[#D87D4A]">
                <FiUploadCloud size={24} />
              </div>
              <p className="text-xs font-bold text-white/40 group-hover:text-white">
                Upload or paste an image
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/10">
                The selected image is stored locally in the admin catalog
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <FieldLabel>Upload Image</FieldLabel>
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  handleImageUpload(event.target.files?.[0] ?? null)
                }
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#D87D4A] file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:text-white"
              />
              <p className="text-[10px] text-white/25">
                {isUploadingImage
                  ? "Processing image..."
                  : "Supported for local admin preview and catalog cards."}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <FieldLabel>Image Path</FieldLabel>
              <input
                value={form.image}
                onChange={(event) => updateField("image", event.target.value)}
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#D87D4A]/50 focus:bg-white/[0.08]"
              />
            </div>

            <div className="mt-4 rounded-2xl border border-white/5 bg-black/20 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                Storefront preview
              </p>
              <p className="mt-2 text-xs text-white/60">
                {form.name || "New product"} will open at{" "}
                <span className="text-[#D87D4A]">{storefrontPath}</span>
              </p>
              <p className="mt-1 text-xs text-white/40">
                {formatCurrency(Number(form.price || 0))}
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-white/5">
                {/* This preview is intentionally lightweight so uploaded images
                can be tested immediately in the admin workflow. */}
                <img
                  src={form.image}
                  alt={form.name || "Product preview"}
                  className="h-40 w-full object-cover"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Visibility"
            description="Choose whether this item is live or saved for later."
            icon={<FiSettings />}
          >
            <div className="space-y-4">
              {(["Live", "Draft", "Hidden"] as const).map((mode) => (
                <label
                  key={mode}
                  className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:bg-white/[0.05]"
                >
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D87D4A]">
                    <input
                      type="radio"
                      name="status"
                      checked={saveMode === mode}
                      onChange={() => setSaveMode(mode)}
                      className="peer absolute h-full w-full opacity-0"
                    />
                    <div className="h-2 w-2 rounded-full bg-[#D87D4A] opacity-0 transition-opacity peer-checked:opacity-100" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      {mode === "Live"
                        ? "Live in store"
                        : mode === "Draft"
                          ? "Saved draft"
                          : "Hidden from storefront"}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/20 uppercase tracking-widest">
                      {mode === "Live"
                        ? "Visible to customers"
                        : mode === "Draft"
                          ? "Saved and ready to publish"
                          : "Not shown on the storefront"}
                    </p>
                  </div>
                </label>
              ))}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:bg-white/[0.05]">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => updateField("featured", event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#D87D4A]"
                />
                <div>
                  <p className="text-xs font-bold text-white">Feature on dashboard</p>
                  <p className="mt-0.5 text-[10px] text-white/20 uppercase tracking-widest">
                    Surface this product more prominently in the admin overview
                  </p>
                </div>
              </label>
            </div>
          </SectionCard>

          <SectionCard
            title="Quick Actions"
            description="Helpful shortcuts while editing a product."
            icon={<FiPackage />}
          >
            <div className="space-y-3">
              <Link
                href="/admin/products"
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-white/10"
              >
                Back to catalog
                <FiArrowLeft />
              </Link>
              <button
                type="button"
                onClick={() => setForm(createEmptyForm())}
                className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-white/10"
              >
                Reset form
                <FiRefreshCw />
              </button>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                  Current save target
                </p>
                <p className="mt-1 text-xs text-white/60">
                  {saveMode === "Live" ? "Publish to store" : "Save as draft"}
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </form>
  );
}
