const PageBanner = ({ title }: { title: string }) => {
  return (
    <section className="bg-black px-6 py-8 md:px-10 md:py-26.25 lg:px-41.25 lg:py-24.5">
      <h1 className="text-center text-heading-md font-bold uppercase tracking-banner text-white md:text-heading-lg md:tracking-title">
        {title}
      </h1>
    </section>
  );
};

export default PageBanner;
