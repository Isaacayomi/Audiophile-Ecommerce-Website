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

export type CartQuantityBadgeProps = {
  count: number;
};
