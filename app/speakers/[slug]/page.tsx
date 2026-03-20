import ProductDetailLayout from "@/app/_components/ProductDetailLayout";
import { getCategoryProducts, Product } from "@/app/lib/products";
import { notFound } from "next/navigation";

// Prebuild all slugs for static generation (optional, if using SSG)
export const generateStaticParams = async () => {
  // Fetch all products in this category from backend
  const products: Product[] = await getCategoryProducts("speakers");

  // Map products to the { slug } format Next.js expects
  return products.map((product) => ({ slug: product.slug }));
};

const SpeakersProductPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  // Extract the slug from the URL
  const { slug } = params;

  // Fetch all speakers (or fetch single product if your backend supports it)
  const products: Product[] = await getCategoryProducts("speakers");

  // Find the product that matches the slug
  const product = products.find((p) => p.slug === slug);

  // If product is not found, delegate to Next.js 404 page
  if (!product) {
    notFound();
  }

  // Render the product details layout component
  return <ProductDetailLayout product={product} />;
};

export default SpeakersProductPage;
