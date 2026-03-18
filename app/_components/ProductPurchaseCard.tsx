"use client";

import { useState } from "react";
import { Product } from "../lib/products";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const ProductPurchaseCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mx-auto max-w-[572px] py-8 md:py-[52px] lg:mx-0 lg:max-w-[445px] lg:py-0">
      {product.isNew ? (
        <p className="mb-6 text-[14px] uppercase tracking-[10px] text-[#D87D4A]">
          New Product
        </p>
      ) : null}

      <h1 className="mb-6 text-[28px] leading-[38px] font-bold uppercase tracking-[1px] text-black md:text-[40px] md:leading-[44px] md:tracking-[1.43px]">
        {product.name}
      </h1>

      <p className="mb-6 text-[15px] leading-[25px] font-medium text-black/50 md:mb-8">
        {product.description}
      </p>

      <p className="mb-[31px] text-[18px] font-bold tracking-[1.29px] text-black">
        {formatPrice(product.price)}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-[120px] items-center justify-between bg-[#F1F1F1] px-[15px] text-[13px] font-bold text-black">
          <button
            type="button"
            className="cursor-pointer text-black/25 transition-colors hover:text-[#D87D4A]"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className="cursor-pointer text-black/25 transition-colors hover:text-[#D87D4A]"
            onClick={() => setQuantity((current) => current + 1)}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center bg-[#D87D4A] px-[31px] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPurchaseCard;
