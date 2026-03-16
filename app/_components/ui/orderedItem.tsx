import Image from "next/image";
import Link from "next/link";

const OrderedItem = () => {
  return (
    <div className="bg-[#F1F1F1] flex flex-col rounded-lg ">
      <div className="flex items-center justify-between p-[35px] ">
        {/* Product Image */}
        <div>
          <Image
            src="/assets/headphone-removed.png"
            width={28}
            height={32}
            quality={100}
            alt="Item Ordered"
            className="h-[32px] w-[28px]"
          />
        </div>

        <div className="flex flex-col justify-center gap-2">
          {/* Product Name */}
          <p className="font-bold text-[15px] text-black">XX99 MK II</p>
          {/* Product Price */}
          <p className="font-bold text-[14px] text-[#00000082]">$ 2,999</p>
        </div>
        {/* Product Quantity */}
        <p className="self-start text-[#00000082] font-bold text-[15px]">X1</p>
      </div>
      <p className="text-[rgba(0,0,0,0.45)] font-bold text-[12px] pt-[12px] border-t-2 border-[#d8d8d8] w-[215px] mx-auto text-center pb-[25px] tracking-[-0.21px]">
        and two other item(s)
      </p>

      {/* Grand Total */}
      <div className="bg-black py-[15px] px-[24px] rounded-b-lg flex flex-col justify-center">
        <p className="font-medium text-[15px] leading-[25px] pb-[8px] text-[rgba(255,255,255,0.5)]">
          GRAND TOTAL
        </p>
        <p className="font-bold text-white text-[18px]">$ 5,446</p>
      </div>

      <Link
        href="/"
        className="bg-[#D87D4A] text-center w-[263px] mx-auto py-[15px]  text-white font-bold text-[13px] tracking-[1px] mt-[23px]"
      >
        BACK TO HOME
      </Link>
    </div>
  );
};

export default OrderedItem;
