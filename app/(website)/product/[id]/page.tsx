import Link from "next/link";
import ProductImage from "@/components/product/ProductImage";
import ProductInfoActions from "@/components/product/ProductInfoActions";
import RelatedProducts from "@/components/product/RelatedProducts";
import { Product } from "@/types/product";
import dummyProducts from "@/data/data-dummy";
import { ProductRouteParams } from "@/types/product";

type Props = { params: ProductRouteParams | Promise<ProductRouteParams> };

export default async function ProductPage({ params }: Props) {
  // Next.js App Router may provide `params` as a Promise; await it to unwrap
  const resolvedParams = await params;
  const id = Array.isArray(resolvedParams?.id)
    ? resolvedParams.id.join("-")
    : resolvedParams?.id;

  let product: Product | null = null;
  let products: Product[] = [];

  // Use centralized dummyProducts for demo data
  products = dummyProducts;
  product = products.find((p) => p.id === id) ?? products[0] ?? null;

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
            className="text-brand-secondary hover-brand-primary underline transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Prepare images array - support single imageUrl or product.images
  const prodWithImages = product as Product & { images?: string[] };
  // If product provides `images`, use them. Otherwise, if we only have a
  // single `imageUrl`, create a small thumbnail set using other images from
  // the public `/imageStock` folder so the gallery shows multiple angles.
  const FALLBACK_STOCK = [
    "/imageStock/img1.jpg",
    "/imageStock/img2.jpg",
    "/imageStock/img3.jpg",
    "/imageStock/img4.jpg",
    "/imageStock/img5.jpg",
  ];

  let images: string[] = [];
  if (Array.isArray(prodWithImages.images) && prodWithImages.images.length) {
    images = prodWithImages.images;
  } else if (prodWithImages.imageUrl) {
    // include the main image first, then fill with up to 3 fallback images
    const others = FALLBACK_STOCK.filter(
      (p) => p !== prodWithImages.imageUrl
    ).slice(0, 3);
    images = [prodWithImages.imageUrl, ...others];
  } else {
    images = [];
  }

  // Related products: same category, exclude current
  const related = products.filter(
    (p) =>
      p.category &&
      product.category &&
      p.category === product.category &&
      p.id !== product.id
  );

  return (
    <div className="w-full pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 gap-y-10 items-start">
        <div>
          {/* single-image product display (new) */}
          <ProductImage
            src={product.imageUrl ?? images[0]}
            alt={product.name}
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
