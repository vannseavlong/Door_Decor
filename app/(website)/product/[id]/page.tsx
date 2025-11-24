import Link from "next/link";
import ImagePreview from "@/components/product/ImagePreview";
import ProductDetails from "@/components/product/ProductDetails";
import RelatedProducts from "@/components/product/RelatedProducts";
import { Product } from "@/types/product";

type Props = { params: { id: string } };

// Local demo products (used as fallback when server fetch is unavailable)
const PRODUCTS: Product[] = [
  {
    id: "sample-1",
    name: "Industrial Steel Girder - Model SG-500",
    imageUrl: "/imageStock/img1.jpg",
    price: 1200,
    category: "Girders",
    description:
      "The Model SG-500 is a high-strength, hot-rolled structural steel girder designed for maximum load-bearing capacity in large-scale industrial and commercial construction projects.",
    specifications: [
      { label: "Material", value: "ASTM A992 Grade 50 Structural Steel" },
      { label: "Dimensions", value: "500mm (H) x 300mm (W) x 12m (L)" },
      { label: "Weight", value: "105 kg/m" },
      { label: "Certifications", value: "ISO 9001, AISC Certified" },
    ],
  },
  {
    id: "sample-2",
    name: "Modern Entry",
    imageUrl: "/imageStock/img2.jpg",
    price: 180,
    category: "Doors",
  },
];

export default async function ProductPage({ params }: Props) {
  const id = params.id;

  let product: Product | null = null;
  let products: Product[] = [];

  // Use local PRODUCTS for now (static UI). This avoids importing server-side
  // Firebase code during dev when FIREBASE_ADMIN_KEY isn't available.
  products = PRODUCTS;
  product = products.find((p) => p.id === id) ?? products[0] ?? null;

  if (!product) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4 text-sm text-gray-600">No product with id {id}.</p>
        <div className="mt-4">
          <Link href="/" className="text-blue-600 underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Prepare images array - support single imageUrl or product.images
  const prodWithImages = product as Product & { images?: string[] };
  const images = Array.isArray(prodWithImages.images)
    ? prodWithImages.images
    : prodWithImages.imageUrl
    ? [prodWithImages.imageUrl]
    : [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 w-full">
          <ImagePreview images={images} alt={product.name} />
        </div>

        <div className="flex-1">
          <ProductDetails product={product} />
        </div>
      </div>

      <RelatedProducts products={products} currentId={product.id} />
    </div>
  );
}
