import Image from "next/image";
import OrderedItem from "./orderedItem";

const CheckoutModal = () => {
  return (
    <div className="fixed top-16  mr-3 inset-x-0 bottom-0 z-50 flex items-center justify-center">
      <div className="relative max-w-81.75 w-full bg-white py-8 px-7 rounded-2xl">
        <Image
          src="/assets/check-icon.png"
          width={64}
          height={64}
          alt="Checkout icon"
          className="pb-5.75"
        />
        <p className="pb-4 max-w-65.75 w-full font-bold text-[24px] leading-7 tracking-[0.86px] text-black">
          THANK YOU FOR YOUR ORDER
        </p>
        <p className="font-medium text-[15px] text-[#00000082] pb-6">
          You will receive an email confirmation shortly.
        </p>

        <OrderedItem/>
      </div>
    </div>
  );
};

export default CheckoutModal;
