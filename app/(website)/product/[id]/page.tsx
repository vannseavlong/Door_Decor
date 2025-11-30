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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="w-full">
          {/* single-image product display (new) */}
          <ProductImage
            src={product.imageUrl ?? images[0]}
            alt={product.name}
          />
        </div>

        <div className="w-full flex flex-col justify-start">
          <ProductInfoActions product={product} />
        </div>
      </div>

      <RelatedProducts products={related} currentId={product.id} />
    </div>
  );
}

// import React, { useState } from 'react';
// import { ArrowLeft, Check, Package, Shield, Award } from 'lucide-react';
// import { Product } from '../types';
// import { mockProducts } from '../data/mockData';
// import { toast } from 'sonner@2.0.3';

// interface ProductDetailProps {
//   productId: string;
//   onNavigate: (page: string) => void;
// }

// export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onNavigate }) => {
//   // In production, fetch from Firestore
//   const product = mockProducts.find(p => p.id === productId);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-gray-900 mb-4">Product not found</h2>
//           <button
//             onClick={() => onNavigate('home')}
//             className="text-orange-500 hover:text-orange-600"
//           >
//             Return to home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Get product images array or fallback to main image
//   const productImages = product.images || [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl];
//   const currentImage = productImages[selectedImageIndex] || product.imageUrl;

//   const handleContactUs = () => {
//     toast.success('Redirecting to contact form...');
//     onNavigate('home');
//     setTimeout(() => {
//       const element = document.getElementById('contact');
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-16">
//             <button
//               onClick={() => onNavigate('home')}
//               className="flex items-center text-gray-700 hover:text-gray-900"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Product Detail Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left - Image Gallery */}
//           <div className="space-y-4">
//             <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//               <img
//                 src={currentImage}
//                 alt={product.name}
//                 className="w-full h-auto"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//               {productImages.map((image, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`bg-white rounded-lg overflow-hidden shadow cursor-pointer hover:shadow-md transition-all ${
//                     selectedImageIndex === index ? 'ring-2 ring-orange-500' : ''
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.name} view ${index + 1}`}
//                     className="w-full aspect-square object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right - Product Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-gray-900 mb-4">
//                 {product.name}
//               </h1>
//               {product.price && (
//                 <div className="flex items-baseline mb-6">
//                   <span className="text-orange-500 mr-2">${product.price}</span>
//                   <span className="text-gray-500 line-through text-sm">
//                     ${Math.round(product.price * 1.3)}
//                   </span>
//                 </div>
//               )}
//               <p className="text-gray-600">
//                 {product.description}
//               </p>
//             </div>

//             {/* Features */}
//             {product.features && product.features.length > 0 && (
//               <div className="bg-white rounded-lg p-6 shadow">
//                 <h3 className="text-gray-900 mb-4">Key Features</h3>
//                 <ul className="space-y-3">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                       <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
//                       <span className="text-gray-700">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Specifications */}
//             {product.specifications && (
//               <div className="bg-white rounded-lg p-6 shadow">
//                 <h3 className="text-gray-900 mb-4">Specifications</h3>
//                 <dl className="space-y-3">
//                   {Object.entries(product.specifications).map(([key, value]) => (
//                     <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
//                       <dt className="text-gray-600">{key}</dt>
//                       <dd className="text-gray-900">{value}</dd>
//                     </div>
//                   ))}
//                 </dl>
//               </div>
//             )}

//             {/* Why Choose Us */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div className="bg-white rounded-lg p-4 shadow text-center">
//                 <Package className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                 <p className="text-gray-700 text-sm">Free Delivery</p>
//               </div>
//               <div className="bg-white rounded-lg p-4 shadow text-center">
//                 <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                 <p className="text-gray-700 text-sm">Quality Guarantee</p>
//               </div>
//               <div className="bg-white rounded-lg p-4 shadow text-center">
//                 <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                 <p className="text-gray-700 text-sm">Certified Products</p>
//               </div>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={handleContactUs}
//                 className="flex-1 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors"
//               >
//                 Contact for Quote
//               </button>
//               <button
//                 onClick={() => toast.info('Product added to inquiry list')}
//                 className="flex-1 bg-white text-orange-500 border-2 border-orange-500 py-4 rounded-lg hover:bg-orange-50 transition-colors"
//               >
//                 Add to Inquiry
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-16">
//           <h2 className="text-gray-900 mb-8">Related Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {mockProducts.slice(0, 4).filter(p => p.id !== productId).map((relatedProduct) => (
//               <div
//                 key={relatedProduct.id}
//                 onClick={() => onNavigate('product-detail', { id: relatedProduct.id })}
//                 className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
//               >
//                 <div className="aspect-square relative overflow-hidden bg-gray-100">
//                   <img
//                     src={relatedProduct.imageUrl}
//                     alt={relatedProduct.name}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-gray-900 mb-2 line-clamp-1">
//                     {relatedProduct.name}
//                   </h3>
//                   {relatedProduct.price && (
//                     <span className="text-orange-500">${relatedProduct.price}</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
