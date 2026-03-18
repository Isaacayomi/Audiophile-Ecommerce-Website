import { ReactNode } from "react";
import { Product } from "./lib/products";

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
