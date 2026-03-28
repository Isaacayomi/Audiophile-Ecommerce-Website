"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiPackage,
  FiPlusSquare,
  FiRefreshCw,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { formatCurrency } from "./_lib/catalog";
import { useAdminCatalog } from "./_components/AdminCatalogProvider";

const MetricCard = ({
  title,
  value,
  detail,
  icon,
  delay = 0,
}: {
  title: string;
  value: string;
  detail: string;
  icon: ReactNode;
  delay?: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6"
  >
    <div className="flex items-start justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D87D4A]/10 text-[#D87D4A]">
        <span className="text-xl">{icon}</span>
      </div>
      <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
        Live <FiArrowUpRight />
      </span>
    </div>
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-widest text-white/30">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-xs text-white/40">{detail}</p>
    </div>
    {/* This glow keeps the card visually tied to the Audiophile brand accent. */}
    <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-[#D87D4A]/5 blur-3xl" />
  </motion.article>
);

const StatusPill = ({ status }: { status: "Live" | "Draft" | "Hidden" }) => {
  const classes =
    status === "Live"
      ? "bg-emerald-500/10 text-emerald-400"
      : status === "Draft"
        ? "bg-amber-500/10 text-amber-300"
        : "bg-rose-500/10 text-rose-400";

  return (
    <span
      className={`inline-flex rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${classes}`}
    >
      {status}
    </span>
  );
};

const statusCopy = {
  Live: "Visible on storefront",
  Draft: "Saved but not published",
  Hidden: "Not shown on storefront",
} as const;

export default function AdminDashboard() {
  const {
    products,
    orders,
    settings,
    lastSyncedAt,
    syncCatalog,
    isSyncing,
  } = useAdminCatalog();

  const liveProducts = products.filter((product) => product.status === "Live");
  const lowStockProducts = products.filter((product) => product.stock <= 15);
  const draftProducts = products.filter((product) => product.status === "Draft");
  const catalogValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );

  const stockHighlights = products.slice(0, 6);
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Welcome back, {settings.adminName}. Here is a live view of the
            Audiophile catalog and storefront status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={syncCatalog}
            disabled={isSyncing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 text-xs font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing" : "Sync Catalog"}
          </button>
          <Link
            href="/admin/products/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D87D4A] px-6 text-xs font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)] transition-all hover:bg-[#FBAF85]"
          >
            <FiPlusSquare />
            Add Product
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Catalog Value"
          value={formatCurrency(catalogValue)}
          detail="Total value of the current admin inventory"
          icon={<FiDollarSign />}
          delay={0.05}
        />
        <MetricCard
          title="Live Products"
          value={String(liveProducts.length)}
          detail="Products visible in the catalog"
          icon={<FiShoppingBag />}
          delay={0.1}
        />
        <MetricCard
          title="Low Stock"
          value={String(lowStockProducts.length)}
          detail="Products needing attention soon"
          icon={<FiTruck />}
          delay={0.15}
        />
        <MetricCard
          title="Draft Items"
          value={String(draftProducts.length)}
          detail="Products saved but hidden"
          icon={<FiPackage />}
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Catalog Health</h2>
              <p className="mt-1 text-xs text-white/30">
                Stock distribution across the current product lineup.
              </p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D87D4A]">
              Last sync{" "}
              {lastSyncedAt ? new Date(lastSyncedAt).toLocaleTimeString() : "today"}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stockHighlights.map((product, index) => {
              return (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-black/30">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-white">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/25">
                        {product.category}
                      </p>
                    </div>
                    <StatusPill status={product.status} />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
                    <div>
                      <p className="text-xs font-bold text-white">{product.stock}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/25">
                        Units
                      </p>
                    </div>
                    <p className="max-w-[10rem] text-right text-[10px] text-white/35">
                      {statusCopy[product.status]}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <Link
                      href={`/admin/products/new?edit=${product.slug}`}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#D87D4A] hover:underline"
                    >
                      Edit item
                    </Link>
                    <Link
                      href={product.storefrontPath}
                      className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white"
                    >
                      View storefront
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <aside className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-white">Live Activity</h2>
          <p className="mt-1 text-xs text-white/30">
            Orders and operational updates on the storefront side.
          </p>

          <div className="mt-6 space-y-5">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#D87D4A]">
                  {index === 0 ? (
                    <FiActivity />
                  ) : index === 1 ? (
                    <FiTruck />
                  ) : index === 2 ? (
                    <FiCheckCircle />
                  ) : (
                    <FiClock />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-bold text-white">
                      {order.product}
                    </p>
                    <span className="whitespace-nowrap text-[9px] font-bold text-white/20">
                      {order.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[10px] text-white/40">
                    {order.customer} - {order.status} - {order.amount}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Featured Products</h2>
            <p className="mt-1 text-sm text-white/40">
              These are the products the storefront currently shows most prominently.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="text-[10px] font-bold uppercase tracking-widest text-[#D87D4A] hover:underline"
          >
            Manage catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-white">{product.name}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-white/25">
                    {formatCurrency(product.price)}
                  </p>
                </div>
                <StatusPill status={product.status} />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                <span>{product.stock} units in stock</span>
                <span>{product.featured ? "Featured" : "Standard"}</span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Link
                  href={`/admin/products/new?edit=${product.slug}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Edit
                </Link>
                <Link
                  href={product.storefrontPath}
                  className="inline-flex items-center justify-center rounded-xl bg-[#D87D4A] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#FBAF85]"
                >
                  Open
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
