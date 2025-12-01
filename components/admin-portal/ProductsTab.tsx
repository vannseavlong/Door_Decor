"use client";

import React, { useState } from "react";
import { Plus, Package, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Product, Category } from "@/types";
import { toast } from "sonner";
import ProductModal from "./ProductModal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState<Category[]>([]); // TODO: Load from Firestore
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // TODO: Delete from Firestore
      setProducts(products.filter((p) => p.id !== productId));
      toast.success("Product deleted successfully");
    }
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
      toast.success("Product updated successfully");
    } else {
      setProducts([...products, product]);
      toast.success("Product added successfully");
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Manage Products</h2>
          <Button variant="default" onClick={handleAddProduct}>
            <Plus className="w-5 h-5 mr-2" /> Add Product
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No products yet</p>
            <Button variant="link" onClick={handleAddProduct}>
              Add your first product
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Specification</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                        <Package className="w-6 h-6" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {product.description?.substring(0, 50)}...
                  </TableCell>
                  <TableCell>
                    {product.categoryId
                      ? getCategoryName(product.categoryId)
                      : "Uncategorized"}
                  </TableCell>
                  <TableCell>
                    {product.specifications &&
                    typeof product.specifications === "object" ? (
                      <ul className="text-xs text-gray-600 space-y-1">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <li key={key}>
                              <span className="font-semibold">{key}:</span>{" "}
                              {value}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>List of all products</TableCaption>
          </Table>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </>
  );
}
