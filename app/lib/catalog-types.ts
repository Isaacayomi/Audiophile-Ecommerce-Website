import type { Product, Category, ResponsiveImageSet } from "../type";

export type CatalogStatus = "Live" | "Draft" | "Hidden";

export type CatalogRecord = Product & {
  stock: number;
  status: CatalogStatus;
  featured: boolean;
  storefrontPath: string;
  image: string;
  updatedAt: string;
};

export type CatalogInput = {
  slug: string;
  shortName: string;
  category: Category;
  name: string;
  price: number;
  description: string;
  stock: number;
  status: CatalogStatus;
  featured: boolean;
  image: string;
  storefrontPath?: string;
};

export type CatalogImageSet = ResponsiveImageSet;

