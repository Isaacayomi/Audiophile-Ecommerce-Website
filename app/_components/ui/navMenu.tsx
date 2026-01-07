import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function NavMenu() {
  const products = [
    {
      image: "/assets/headphone.png",
      name: "HEADPHONES",
    },
    {
      image: "/assets/speaker.png",
      name: "SPEAKERS",
    },
    {
      image: "/assets/earphone.png",
      name: "EARPHONES",
    },
  ];
  return (
    <div className="absolute z-99 max-w-[327px] w-full h-[683px] mx-auto pg-[32px] px-[24px] bg-white">
      {/* Head phones menu */}
      {products.map((product) => {
        return (
          <div
            key={product.name}
            className="relative bg-[#F1F1F1] max-w-[327px] w-full h-[165px] flex flex-col items-center justify-center gap-4 mb-6 rounded-2xl mt-[64px] mb-[68px]"
          >
            <div>
              <Image
                src={product.image}
                alt="Product image"
                width={94.89}
                height={108}
                className="absolute -top-[20px]"
              />

              <p className=" text-center text-[#000000] font-bold text-[15px] pt-[20px] tracking-[1.07px]">
                {product.name}
              </p>
              <p className="flex items-center justify-center  text-center">
                <span className=" tracking-normal text-[13px] font-bold text-[rgba(0,0,0,0.5)] ">
                  SHOP
                </span>
                <span>
                  <MdOutlineKeyboardArrowRight className="text-[#FBAF85]" />
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NavMenu;
