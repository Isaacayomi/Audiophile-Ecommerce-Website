const PageBanner = ({ title }: { title: string }) => {
  return (
    <section className="bg-black px-6 py-8 md:px-10 md:py-[105px] lg:px-[165px] lg:py-[98px]">
      <h1 className="text-center text-[28px] font-bold uppercase tracking-[2px] text-white md:text-[40px] md:tracking-[1.43px]">
        {title}
      </h1>
    </section>
  );
};

export default PageBanner;
