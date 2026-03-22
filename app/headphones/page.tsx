import BestGearSection from "../_components/BestGearSection";
import CategoryCards from "../_components/CategoryCards";
import PageBanner from "../_components/PageBanner";
import ProductCategorySection from "../_components/ProductCategorySection";
import { getCategoryProducts } from "../lib/products";
import { Product } from "../type";

const HeadphonesPage = async () => {
  // Category pages read their product list directly from the backend.
  const products: Product[] = await getCategoryProducts("headphones");

  return (
    <div className="bg-white">
      <PageBanner title="Headphones" />
      <div className="mt-16 grid gap-30 md:mt-30 md:gap-30 lg:mt-40 lg:gap-40">
        {products?.map((product, index) => (
          <ProductCategorySection
            key={product.slug}
            product={product}
            // Alternate the desktop layout to match the design rhythm.
            reverse={index % 2 === 1}
          />
        ))}
      </div>
      <CategoryCards className="mt-30 lg:mt-40" />
      <BestGearSection className="mt-30 lg:mt-42" />
    </div>
  );
};

export default HeadphonesPage;
