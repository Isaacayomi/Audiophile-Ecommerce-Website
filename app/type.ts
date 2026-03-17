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

export interface ModalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  classname?: string;
  width?: string;
  paddingY?: string;
}

export interface NavMenuProps {
  absolute?: boolean;
}
