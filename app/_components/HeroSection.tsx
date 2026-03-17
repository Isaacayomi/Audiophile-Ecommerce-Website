import NavMenu from "./ui/navMenu";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ModalButton from "./ui/modalButton";

const HeroSection = () => {
  return (
    <div className="h-screen bg-[url('/assets/hero-cover.png')] bg-no-repeat bg-[position:center_-98px] bg-cover overflow-hidden">
      <div className="w-[328px] mx-auto text-center pt-[108px] pb-[112px]">
        <p className="pb-[16px] text-[14px] tracking-[10px] text-[#FFFFFF7F]">
          NEW PRODUCT
        </p>
        <h1 className="pb-[24px] uppercase font-bold text-[36px] tracking-[1.29px] leading-[41px]">
          XX99 Mark II Headphones
        </h1>
        <p className="pb-[28px] text-[15px] font-medium leading-[30px] tracking-[1.15px] text-[#FFFFFFBF]">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>

        <ModalButton classname="w-[50%] uppercase">See Product</ModalButton>
      </div>

      <NavMenu absolute={false} />
    </div>
  );
};

export default HeroSection;
