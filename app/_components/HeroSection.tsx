import NavMenu from "./ui/navMenu";
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

        <ModalButton
          width="w-[160px]"
          paddingY="py-0"
          classname="uppercase font-bold text-[13px] tracking-[1px] px-0  "
        >
          See Product
        </ModalButton>
      </div>

      <NavMenu absolute={false} />
    </div>
  );
};

export default HeroSection;
