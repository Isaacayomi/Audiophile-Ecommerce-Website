import { CartQuantityBadgeProps } from "@/app/type";

const CartQuantityBadge = ({ count }: CartQuantityBadgeProps) => {
  if (count < 1) return null;

  return (
    <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default CartQuantityBadge;
