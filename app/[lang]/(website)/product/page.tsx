import ProductsSection from "@/components/website/ProductsSection";
import { getProductsServer } from "@/lib/firebase/product";
import { getCategoriesServer } from "@/lib/firebase/category";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function ProductPage() {
  // Fetch products and categories from Firebase
  const [productsData, categoriesData] = await Promise.all([
    getProductsServer(),
    getCategoriesServer(),
  ]);

  console.log("📦 Product Page - Products count:", productsData.length);
  console.log("📦 Product Page - Categories count:", categoriesData.length);
  console.log("📦 Product Page - Sample product:", productsData[0]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ProductsSection products={productsData} categories={categoriesData} />
    </div>
  );
}
