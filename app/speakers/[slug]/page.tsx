import { notFound } from "next/navigation";
import ProductDetailLayout from "../../_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "../../lib/products";

export const generateStaticParams = () =>
  getCategoryProducts("speakers").map((product) => ({ slug: product.slug }));

const SpeakerProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = getProduct("speakers", slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default SpeakerProductPage;
