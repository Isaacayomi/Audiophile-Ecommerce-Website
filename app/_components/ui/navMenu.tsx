import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const NavMenu = () => {
  const products = [
    {
      image: "/assets/headphone.png",
      name: "HEADPHONES",
      link: "/headphones",
    },
    {
      image: "/assets/speaker.png",
      name: "SPEAKERS",
      link: "/speakers",
    },
    {
      image: "/assets/earphone.png",
      name: "EARPHONES",
      link: "/earphones",
    },
  ];
  return (
    <div className="absolute z-99  w-full h-187.5 mx-auto pg-[32px] px-6 bg-white md:h-85 md:flex md:flex-row gap-2.5">
      {products.map((product) => {
        return (
          <div
            key={product.name}
            className="relative bg-[#F1F1F1] max-w-81.75 w-full h-41.25 mx-auto flex flex-col items-center justify-center gap-4 mb-6 rounded-2xl mt-16 "
          >
            <div>
              <Image
                src={product.image}
                alt="Product image"
                width={100}
                height={100}
                className="absolute left-1/2 -top-5 -translate-x-1/2 w-[94.89px] md:w-35 md:-top-9 "
              />

              <div className="absolute bottom-6 left-0 right-0 ">
                <p className=" text-center text-[#000000] font-bold text-[15px] pt-5 pb-4.25 tracking-[1.07px] ">
                  {product.name}
                </p>
                <p className="flex items-center justify-center  text-center">
                  <Link
                    href={product.link}
                    className=" tracking-normal text-[13px] font-bold text-[rgba(0,0,0,0.5)] "
                  >
                    SHOP
                  </Link>
                  <span>
                    <MdOutlineKeyboardArrowRight className="text-[#FBAF85]" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NavMenu;
