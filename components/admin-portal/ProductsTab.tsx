"use client";

import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/app/(admin-portal)/dashboard/product-actions";
import { getCategories } from "@/app/(admin-portal)/dashboard/category-actions";

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(
          productsData.map((p) => ({ ...p, id: p.id || "" })) as Product[]
        );
        setCategories(
          categoriesData.map((c) => ({ ...c, id: c.id || "" })) as Category[]
        );
      } catch {
        toast.error("Failed to load data");
      }
      setLoading(false);
    })();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      toast.success("Product deleted successfully");
    }
  };

  const handleSaveProduct = async (product: Product) => {
    // Ensure name/description are always { en, km }
    const safeProduct = {
      ...product,
      name:
        typeof product.name === "string"
          ? { en: product.name, km: "" }
          : product.name,
      description:
        typeof product.description === "string"
          ? { en: product.description, km: "" }
          : product.description,
    };

    if (editingProduct) {
      await updateProduct(safeProduct.id, safeProduct);
      setProducts(
        products.map((p) => (p.id === safeProduct.id ? safeProduct : p))
      );
      toast.success("Product updated successfully");
    } else {
      const { id } = await addProduct(safeProduct);
      setProducts([...products, { ...safeProduct, id }]);
      toast.success("Product added successfully");
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return categoryId;
    return typeof category.name === "string" ? category.name : category.name.en;
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === selectedCategory);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Manage Products</h2>
            <div className="flex items-center gap-3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {typeof category.name === "string"
                        ? category.name
                        : category.name.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="default" onClick={handleAddProduct}>
                <Plus className="w-5 h-5 mr-2" /> Add Product
              </Button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">
              {products.length === 0
                ? "No products yet"
                : "No products in this category"}
            </p>
            <Button
              variant="link"
              onClick={handleAddProduct}
              className="text-brand-primary hover:text-brand-primary/90 font-medium"
            >
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
                <TableHead>Product Code</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={
                          typeof product.name === "string"
                            ? product.name
                            : product.name.en
                        }
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                        <Package className="w-6 h-6" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {typeof product.name === "string"
                      ? product.name
                      : product.name.en}
                  </TableCell>
                  <TableCell>
                    {typeof product.description === "string"
                      ? product.description.substring(0, 50)
                      : product.description?.en?.substring(0, 50)}
                    ...
                  </TableCell>
                  <TableCell>
                    {product.categoryId
                      ? getCategoryName(product.categoryId)
                      : "Uncategorized"}
                  </TableCell>
                  <TableCell>
                    {product.productCode &&
                    typeof product.productCode === "object" &&
                    Object.keys(product.productCode).length > 0 ? (
                      <ul className="text-xs text-gray-600 space-y-1">
                        {Object.entries(product.productCode).map(
                          ([key, value]) => {
                            const [labelEn] = key.split("/");
                            return (
                              <li key={key}>
                                <span className="font-semibold">
                                  {labelEn}:
                                </span>{" "}
                                {value.en}
                              </li>
                            );
                          }
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
