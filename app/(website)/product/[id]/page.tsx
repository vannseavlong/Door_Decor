import Link from "next/link";
import ProductImage from "@/components/product/ProductImage";
import ProductInfoActions from "@/components/product/ProductInfoActions";
import RelatedProducts from "@/components/product/RelatedProducts";
import { ProductRouteParams } from "@/types/product";
import { getProductsServer, ProductRecord } from "@/lib/firebase/product";

// Enable ISR - revalidate every 120 seconds (2 minutes)
export const revalidate = 120;

type Props = { params: ProductRouteParams | Promise<ProductRouteParams> };

export default async function ProductPage({ params }: Props) {
  // Next.js App Router may provide `params` as a Promise; await it to unwrap
  const resolvedParams = await params;
  const id = Array.isArray(resolvedParams?.id)
    ? resolvedParams.id.join("-")
    : resolvedParams?.id;

  // Fetch products from Firebase
  const productsData = await getProductsServer();

  const product =
    productsData.find((p) => p.id === id) ?? productsData[0] ?? null;

  if (!product) {
    return (
      <div className="p-6">
        <h1 className="heading-3 text-brand-dark">Product not found</h1>
        <p
          className="body-base text-gray-600"
          style={{ marginTop: "var(--space-4)" }}
        >
          No product with id {id}.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="text-brand-primary hover:text-brand-secondary underline transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Related products: same category, exclude current
  const related = productsData.filter(
    (p) =>
      p.categoryId &&
      product.categoryId &&
      p.categoryId === product.categoryId &&
      p.id !== product.id
  );

  return (
    <div className="w-full pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-10 items-start">
        <div>
          {/* single-image product display */}
          <ProductImage
            src={product.imageUrl}
            alt={
              typeof product.name === "string" ? product.name : product.name.en
            }
          />
        </div>

        <div className="flex flex-col justify-start h-full w-full">
          <ProductInfoActions product={product} />
        </div>
      </div>

      <RelatedProducts products={related} currentId={product.id} />
    </div>
  );
}
