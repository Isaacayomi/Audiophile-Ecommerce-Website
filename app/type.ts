import { ReactNode } from "react";

export interface toggleNavState {
  value: boolean;
}

export interface toggleCartState {
  value: boolean;
}

export interface toggleCheckoutState {
  value: boolean;
}

export interface toggleOrderCompletionState {
  value: boolean;
}

export interface cartValueState {
  value: number;
  selectedValue: number;
  items: CartItem[];
  shortName?: string;
}

export interface CartItem {
  slug: string;
  name: string;
  shortName: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ModalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  classname?: string;
  width?: string;
  paddingX?: string;
}

export interface NavMenuProps {
  absolute?: boolean;
}

export interface BestGearSectionProps {
  className?: string;
  title?: string;
}

export interface ProductCategorySectionProps {
  product: Product;
  reverse?: boolean;
}

export interface ResponsivePictureProps {
  alt: string;
  mobileSrc: string;
  tabletSrc: string;
  desktopSrc: string;
  className?: string;
  imageClassName?: string;
}

export type Category = "headphones" | "speakers" | "earphones";

export interface ResponsiveImageSet {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductInclude {
  quantity: number;
  item: string;
}

export interface Product {
  slug: string;
  category: Category;
  categoryLabel: string;
  shortName: string;
  name: string;
  isNew?: boolean;
  price: number;
  description: string;
  features: string[];
  includes: ProductInclude[];
  categoryImage: ResponsiveImageSet;
  productImage: ResponsiveImageSet;
  gallery: {
    first: ResponsiveImageSet;
    second: ResponsiveImageSet;
    third: ResponsiveImageSet;
  };
  others: Array<{
    slug: string;
    category: Category;
    name: string;
    image: ResponsiveImageSet;
  }>;
  categoryOrder: number;
}

export type CatalogStatus = "Live" | "Draft" | "Hidden";

export interface CatalogRecord extends Product {
  stock: number;
  status: CatalogStatus;
  featured: boolean;
  storefrontPath: string;
  image: string;
  updatedAt: string;
}

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

export type AdminProduct = CatalogRecord;

export interface AdminOrder {
  id: string;
  customer: string;
  product: string;
  status: "Delivered" | "In Transit" | "Pending";
  amount: string;
  time: string;
}

export interface AdminSettings {
  storeName: string;
  adminName: string;
  supportEmail: string;
  catalogSyncEnabled: boolean;
  emailAlertsEnabled: boolean;
  storefrontNotes: string;
}

export type AdminSidebarState = {
  isOpen: boolean;
};

export type AdminProductFilterState = {
  query: string;
  category: "all" | Category;
};

export type AdminSettingsDraft = AdminSettings;

export type CatalogImageSet = ResponsiveImageSet;

export type AdminProductFormValues = {
  name: string;
  shortName: string;
  category: Category;
  price: string;
  stock: string;
  status: CatalogStatus;
  featured: boolean;
  description: string;
  image: string;
};

export type AdminProductFormState = {
  form: AdminProductFormValues;
  saveMode: CatalogStatus;
  isSaving: boolean;
  isUploadingImage: boolean;
};

export type CartQuantityBadgeProps = {
  count: number;
};
