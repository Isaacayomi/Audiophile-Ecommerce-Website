import BestGearSection from "../_components/BestGearSection";
import CategoryCards from "../_components/CategoryCards";
import PageBanner from "../_components/PageBanner";
import ProductCategorySection from "../_components/ProductCategorySection";
import { getCategoryProducts } from "../lib/products";

const SpeakersPage = () => {
  const products = getCategoryProducts("speakers");

  return (
    <div className="bg-white">
      <PageBanner title="Speakers" />
      <div className="mt-16 grid gap-[120px] md:mt-[120px] md:gap-[120px] lg:mt-[160px] lg:gap-[160px]">
        {products.map((product, index) => (
          <ProductCategorySection
            key={product.slug}
            product={product}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
      <CategoryCards className="mt-[120px] lg:mt-[160px]" />
      <BestGearSection className="mt-[120px] lg:mt-[168px]" />
    </div>
  );
};

export default SpeakersPage;
