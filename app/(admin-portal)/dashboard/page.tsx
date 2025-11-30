"use client";
import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-sm text-gray-600">Welcome to the admin area.</p>
    </div>
  );
// }import React, { useState } from 'react';
// import { LogOut, Plus, Edit2, Trash2, Home, Package, Mail } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { Product } from '../../types';
// import { mockProducts } from '../../data/mockData';
// import { toast } from 'sonner@2.0.3';
// import { ImageUpload } from '../../components/admin/ImageUpload';
// import { MultipleImageUpload } from '../../components/admin/MultipleImageUpload';

// interface DashboardProps {
//   onNavigate: (page: string) => void;
// }

// export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
//   const { logout } = useAuth();
//   const [products, setProducts] = useState<Product[]>(mockProducts);
//   const [activeTab, setActiveTab] = useState<'products' | 'hero' | 'messages'>('products');
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [productFormData, setProductFormData] = useState({
//     mainImage: '',
//     additionalImages: [] as string[]
//   });
//   const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80');

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       onNavigate('home');
//     } catch (error) {
//       toast.error('Failed to logout');
//     }
//   };

//   const handleDeleteProduct = (productId: string) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       // In production, delete from Firestore
//       setProducts(products.filter(p => p.id !== productId));
//       toast.success('Product deleted successfully');
//     }
//   };

//   const handleEditProduct = (product: Product) => {
//     setEditingProduct(product);
//     setProductFormData({
//       mainImage: product.imageUrl,
//       additionalImages: product.images || []
//     });
//     setShowProductModal(true);
//   };

//   const handleAddProduct = () => {
//     setEditingProduct(null);
//     setProductFormData({
//       mainImage: '',
//       additionalImages: []
//     });
//     setShowProductModal(true);
//   };

//   const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
    
//     // Validate that we have at least the main image
//     if (!productFormData.mainImage) {
//       toast.error('Please upload a main product image');
//       return;
//     }

//     const productData: Product = {
//       id: editingProduct?.id || Date.now().toString(),
//       name: formData.get('name') as string,
//       description: formData.get('description') as string,
//       imageUrl: productFormData.mainImage,
//       images: productFormData.additionalImages.length > 0 ? productFormData.additionalImages : undefined,
//       price: parseFloat(formData.get('price') as string) || undefined,
//       features: (formData.get('features') as string)?.split('\n').filter(f => f.trim()) || [],
//       createdAt: editingProduct?.createdAt || new Date(),
//       updatedAt: new Date()
//     };

//     if (editingProduct) {
//       // Update existing product - In production, update Firestore
//       setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
//       toast.success('Product updated successfully');
//     } else {
//       // Add new product - In production, add to Firestore
//       setProducts([...products, productData]);
//       toast.success('Product added successfully');
//     }

//     setShowProductModal(false);
//     setEditingProduct(null);
//     setProductFormData({ mainImage: '', additionalImages: [] });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
//                 <span className="text-white">WD</span>
//               </div>
//               <h1 className="text-gray-900">Admin Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => onNavigate('home')}
//                 className="flex items-center text-gray-700 hover:text-gray-900"
//               >
//                 <Home className="w-5 h-5 mr-2" />
//                 View Site
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center text-red-600 hover:text-red-700"
//               >
//                 <LogOut className="w-5 h-5 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Tabs */}
//         <div className="bg-white rounded-lg shadow mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               <button
//                 onClick={() => setActiveTab('products')}
//                 className={`py-4 px-6 border-b-2 font-medium text-sm ${
//                   activeTab === 'products'
//                     ? 'border-orange-500 text-orange-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Package className="w-5 h-5 inline-block mr-2" />
//                 Products
//               </button>
//               <button
//                 onClick={() => setActiveTab('hero')}
//                 className={`py-4 px-6 border-b-2 font-medium text-sm ${
//                   activeTab === 'hero'
//                     ? 'border-orange-500 text-orange-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Home className="w-5 h-5 inline-block mr-2" />
//                 Hero Section
//               </button>
//               <button
//                 onClick={() => setActiveTab('messages')}
//                 className={`py-4 px-6 border-b-2 font-medium text-sm ${
//                   activeTab === 'messages'
//                     ? 'border-orange-500 text-orange-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Mail className="w-5 h-5 inline-block mr-2" />
//                 Messages
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Products Tab */}
//         {activeTab === 'products' && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//               <h2 className="text-gray-900">Manage Products</h2>
//               <button
//                 onClick={handleAddProduct}
//                 className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Add Product
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-gray-700">Image</th>
//                     <th className="px-6 py-3 text-left text-gray-700">Name</th>
//                     <th className="px-6 py-3 text-left text-gray-700">Description</th>
//                     <th className="px-6 py-3 text-left text-gray-700">Price</th>
//                     <th className="px-6 py-3 text-left text-gray-700">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {products.map((product) => (
//                     <tr key={product.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <img 
//                           src={product.imageUrl} 
//                           alt={product.name} 
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{product.name}</td>
//                       <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
//                         {product.description}
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">
//                         {product.price ? `$${product.price}` : '-'}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleEditProduct(product)}
//                             className="text-blue-600 hover:text-blue-700"
//                           >
//                             <Edit2 className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteProduct(product.id)}
//                             className="text-red-600 hover:text-red-700"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Hero Tab */}
//         {activeTab === 'hero' && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-gray-900 mb-6">Edit Hero Section</h2>
//             <form className="space-y-6">
//               <div>
//                 <label className="block text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   defaultValue="Welcome to Our Company"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">Description</label>
//                 <textarea
//                   rows={4}
//                   defaultValue="Wonder Door Industrial takes you to the doors of the future for modern and contemporary living, combined with international standard quality."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 ></textarea>
//               </div>
              
//               {/* Hero Image Upload */}
//               <ImageUpload
//                 label="Hero Section Image"
//                 currentImage={heroImage}
//                 onImageChange={setHeroImage}
//                 required
//               />

//               <button
//                 type="submit"
//                 onClick={(e) => { e.preventDefault(); toast.success('Hero section updated!'); }}
//                 className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
//               >
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Messages Tab */}
//         {activeTab === 'messages' && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-gray-900">Contact Messages</h2>
//             </div>
//             <div className="p-6">
//               <p className="text-gray-600 text-center py-8">No messages yet</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Product Modal */}
//       {showProductModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-gray-900">
//                 {editingProduct ? 'Edit Product' : 'Add New Product'}
//               </h2>
//             </div>
//             <form onSubmit={handleSaveProduct} className="p-6 space-y-6">
//               <div>
//                 <label className="block text-gray-700 mb-2">Product Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   defaultValue={editingProduct?.name}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   rows={3}
//                   defaultValue={editingProduct?.description}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 ></textarea>
//               </div>

//               {/* Main Product Image Upload */}
//               <ImageUpload
//                 label="Main Product Image"
//                 currentImage={productFormData.mainImage}
//                 onImageChange={(url) => setProductFormData({ ...productFormData, mainImage: url })}
//                 required
//               />

//               {/* Additional Images Upload */}
//               <MultipleImageUpload
//                 label="Additional Product Images (Different Angles)"
//                 currentImages={productFormData.additionalImages}
//                 onImagesChange={(urls) => setProductFormData({ ...productFormData, additionalImages: urls })}
//                 maxImages={4}
//               />

//               <div>
//                 <label className="block text-gray-700 mb-2">Price ($)</label>
//                 <input
//                   type="number"
//                   name="price"
//                   step="0.01"
//                   defaultValue={editingProduct?.price}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">Features (one per line)</label>
//                 <textarea
//                   name="features"
//                   rows={5}
//                   defaultValue={editingProduct?.features?.join('\n')}
//                   placeholder="Waterproof&#10;Termite-resistant&#10;Easy to clean"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 ></textarea>
//               </div>
//               <div className="flex space-x-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
//                 >
//                   Save Product
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowProductModal(false);
//                     setEditingProduct(null);
//                   }}
//                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

