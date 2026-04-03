import { StorefrontCategoryView } from "../_components/StorefrontCatalogViews";
import { getCategoryProducts } from "../lib/products.server";
import { Product } from "../type";

export const dynamic = "force-dynamic";

const EarphonesPage = async () => {
  // Category pages read their product list directly from the backend.
  const products: Product[] = await getCategoryProducts("earphones");

  return <StorefrontCategoryView title="Earphones" category="earphones" products={products} />;
};

export default EarphonesPage;
