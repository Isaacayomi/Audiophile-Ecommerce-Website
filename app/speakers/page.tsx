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
      <div className="mt-16 grid gap-30 md:mt-30 md:gap-30 lg:mt-40 lg:gap-40">
        {products.map((product, index) => (
          <ProductCategorySection
            key={product.slug}
            product={product}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
      <CategoryCards className="mt-30 lg:mt-40" />
      <BestGearSection className="mt-30 lg:mt-42" />
    </div>
  );
};

export default SpeakersPage;
