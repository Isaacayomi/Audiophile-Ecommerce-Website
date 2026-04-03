import { StorefrontCategoryView } from "../_components/StorefrontCatalogViews";
import { getCategoryProducts } from "../lib/products.server";
import { Product } from "../type";

export const dynamic = "force-dynamic";

const HeadphonesPage = async () => {
  // Category pages read their product list directly from the backend.
  const products: Product[] = await getCategoryProducts("headphones");

  return <StorefrontCategoryView title="Headphones" category="headphones" products={products} />;
};

export default HeadphonesPage;
