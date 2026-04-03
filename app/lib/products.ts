import type { Category } from "../type";

export const categories: Array<{ slug: Category; label: string }> = [
  { slug: "headphones", label: "Headphones" },
  { slug: "speakers", label: "Speakers" },
  { slug: "earphones", label: "Earphones" },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://audiophille-database-3.onrender.com";
