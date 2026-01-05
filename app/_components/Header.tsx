import Image from "next/image";

function Header() {
  return (
    <nav>
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between py-8 px-6 border-b border-[#979797] md:hidden">
        <div>
          <Image src="/hamburger.svg" alt="Hamburger" height={15} width={16} />
        </div>
        <div>
          <Image src="/logo.png" alt="Logo" height={25} width={143} />
        </div>
        <div>
          <Image
            src="/assets/cart-icon.svg"
            alt="Logo"
            height={20}
            width={23}
          />
        </div>
      </div>

      {/* Tablet Navbar */}
      <div className="hidden md:flex items-center gap-116.25 justify-center py-8 mx-[39px] border-b border-[#979797] ">
        <div className="flex items-center gap-[42px]">
          <div>
            <Image
              src="/hamburger.svg"
              alt="Hamburger"
              height={15}
              width={16}
            />
          </div>
          <div>
            <Image src="/logo.png" alt="Logo" height={25} width={143} />
          </div>
        </div>
        <div>
          <Image
            src="/assets/cart-icon.svg"
            alt="Logo"
            height={20}
            width={23}
          />
        </div>
      </div>
    </nav>
  );
}
export default Header;
