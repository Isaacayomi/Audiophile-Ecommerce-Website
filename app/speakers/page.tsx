import { StorefrontCategoryView } from "../_components/StorefrontCatalogViews";
import { getCategoryProducts } from "../lib/products.server";
import { Product } from "../type";

export const dynamic = "force-dynamic";

const SpeakersPage = async () => {
  // Category pages read their product list directly from the backend.
  const products: Product[] = await getCategoryProducts("speakers");

  return <StorefrontCategoryView title="Speakers" category="speakers" products={products} />;
};

export default SpeakersPage;
