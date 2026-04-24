import type { Metadata } from "next";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

export const metadata: Metadata = {
  title: "Order Successful | Audiophile",
  description: "Your Audiophile order has been confirmed.",
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessClient />;
}
