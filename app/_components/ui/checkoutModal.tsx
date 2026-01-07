import Image from "next/image";

function CheckoutModal() {
  return (
    <div className="fixed top-[64px]  mr-3 inset-x-0 bottom-0 z-50 flex items-center justify-center">
      <div className="relative max-w-[327px] w-full bg-white py-[32px] px-[28px] rounded-2xl">
        <Image
          src="/assets/check-icon.png"
          width={64}
          height={64}
          alt="Checkout icon"
          className="pb-[23px]"
        />
        <p className="pb-[16px] max-w-[263px] w-full font-bold text-[24px] leading-[28px] tracking-[0.86px] text-black">
          THANK YOU FOR YOUR ORDER
        </p>
        <p className="font-medium text-[15px] text-[#00000082] pb-[24px]">
          You will receive an email confirmation shortly.
        </p>
      </div>
    </div>
  );
}

export default CheckoutModal;
