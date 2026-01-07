import Image from "next/image";
import ModalButton from "./modalButton";

function Cart() {
  return (
    <div className="max-w-[327px] mx-auto w-full bg-white py-[32px] px-[28px] rounded-2xl mt-[24px]">
      <p className="flex items-center justify-between pb-[31px]">
        <span className="font-bold text-[18px] tracking-[1.29px] text-black">
          CART (3)
        </span>
        <span className="cursor-pointer underline text-[#00000082]">
          Remove all
        </span>
      </p>

      <div className="mb-[24px] bg-white flex items-center justify-between">
        <div className="bg-[#F1F1F1] w-[64px] h-[64px] flex justify-center items-center rounded-lg">
          <Image
            src="/assets/headphone-removed.png"
            alt="Product image"
            width={36.19}
            height={40}
            quality={100}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center gap-3.5">
          <p className="flex flex-col justify-center">
            <span className="text-black font-bold text-[15px]">XX99 MK II</span>
            <span className="text-[#00000082] text-[14px]">$ 2,999</span>
          </p>
        </div>

        <div className="w-[96px] py-[7px] px-[11.5px] flex items-center justify-between gap-[12px] text-[13px] bg-[#F1F1F1]">
          <button className="cursor-pointer font-bold text-[#00000082]">
            -
          </button>
          <span className="font-bold  text-black">1</span>
          <button className="cursor-pointer font-bold text-[#00000082]">
            +
          </button>
        </div>
      </div>

      <div className="pb-[24px] flex items-center justify-between pt-[32px]">
        <p className="text-[#00000082] font-medium text-[15px]">TOTAL</p>
        <p className="font-bold text-black text-[18px]">$ 5,396</p>
      </div>
      <ModalButton>CHECKOUT</ModalButton>
    </div>
  );
}
export default Cart;
