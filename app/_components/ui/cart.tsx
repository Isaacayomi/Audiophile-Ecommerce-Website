"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "../../store/uiState/cartSlice";
import { useRouter } from "next/navigation";
import ModalBackdrop from "./ModalBackdrop";
import { RhythmGroup, RhythmItem } from "./Rhythm";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
  removeAllCartItems,
} from "@/app/store/uiState/cartValueslice";
import { FiTrash2 } from "react-icons/fi";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // Line items committed to cart from product pages.
  const cartItems = useSelector((state: RootState) => state.cartValue.items);
  // Total quantity across all line items (used in header badge and cart title).
  const cartCount = useSelector((state: RootState) => state.cartValue.value);

  // Cart subtotal computed from all item rows.
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <ModalBackdrop
      onClose={() => dispatch(closeCart())}
      wrapperClassName="items-start justify-center px-6 pt-28 md:justify-end md:px-10 md:pt-28 lg:px-41.25 lg:pt-32"
      panelClassName="relative w-full max-w-94.25 rounded-lg bg-white px-7 py-8 shadow-panel"
    >
      <RhythmGroup inView={false}>
        <button
          onClick={() => dispatch(closeCart())}
          aria-label="Close cart"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-black transition-colors hover:bg-gray-300"
        >
          <span className="leading-none">&times;</span>
        </button>

        <p className="flex items-center justify-between pb-7.75 pt-3">
          <span className="text-title font-bold tracking-heading text-black">
            CART ({cartCount})
          </span>
          <button
            type="button"
            onClick={() => dispatch(removeAllCartItems())}
            className="cursor-pointer underline text-black/50 transition-colors hover:text-brand"
          >
            Remove all
          </button>
        </p>

        {/* Empty-state keeps modal informative when no items are present. */}
        {cartItems.length === 0 ? (
          <p className="mb-8 text-copy font-medium text-black/50">
            Your cart is empty.
          </p>
        ) : (
          <div className="mb-6 space-y-6 bg-white">
            {cartItems.map((item) => (
              <div
                key={item.slug}
                className="flex items-center justify-between bg-white"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-surface">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>

                <div className="ml-4 flex flex-col justify-center gap-3.5">
                  <p className="flex flex-col justify-center">
                    <span className="text-copy font-bold text-black">
                      {item.shortName}
                    </span>
                    <span className="text-overline text-black/50">
                      {formatPrice(item.price)}
                    </span>
                  </p>
                </div>

                <div className="ml-3 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-black/45 transition-colors hover:bg-surface hover:text-brand"
                    onClick={() => dispatch(removeCartItem(item.slug))}
                  >
                    <FiTrash2 size={16} />
                  </button>
                  {/* Quantity controls mutate the specific line item in Redux. */}
                  <div className="flex w-24 items-center justify-between gap-3 bg-surface px-3 py-1.75 text-label">
                    <button
                      type="button"
                      className="cursor-pointer font-bold text-black/50 transition-colors hover:text-brand"
                      onClick={() =>
                        dispatch(decreaseCartItemQuantity(item.slug))
                      }
                    >
                      -
                    </button>
                    <span className="font-bold text-black">{item.quantity}</span>
                    <button
                      type="button"
                      className="cursor-pointer font-bold text-black/50 transition-colors hover:text-brand"
                      onClick={() =>
                        dispatch(increaseCartItemQuantity(item.slug))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pb-6 pt-8">
          <p className="text-copy font-medium text-black/50">TOTAL</p>
          <p className="text-title font-bold text-black">
            {formatPrice(total)}
          </p>
        </div>

        <RhythmItem variant="pop">
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => {
              dispatch(closeCart());
              router.push("/checkout");
            }}
            className="inline-flex h-12 w-full items-center justify-center bg-brand text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            CHECKOUT
          </button>
        </RhythmItem>
      </RhythmGroup>
    </ModalBackdrop>
  );
};
export default Cart;
