import { notFound } from "next/navigation";
import ProductDetailLayout from "../../_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "../../lib/products";

// Prebuild every speaker product page so each slug can be statically generated.
export const generateStaticParams = () =>
  getCategoryProducts("speakers").map((product) => ({ slug: product.slug }));

const SpeakerProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Resolve the incoming slug and look up the matching speaker product record.
  const { slug } = await params;
  const product = getProduct("speakers", slug);

  // Delegate unknown slugs to Next.js so the route renders the 404 page.
  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default SpeakerProductPage;
