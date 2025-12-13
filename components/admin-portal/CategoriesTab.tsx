"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, FolderTree } from "lucide-react";
import { Category } from "@/types";
import { toast } from "sonner";
import CategoryModal from "./CategoryModal";

export default function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // TODO: Check if category has products in Firestore
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== categoryId));
      toast.success("Category deleted successfully");
    }
  };

  const handleSaveCategory = (category: Category) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) => (c.id === category.id ? category : c))
      );
      toast.success("Category updated successfully");
    } else {
      setCategories([...categories, category]);
      toast.success("Category added successfully");
    }
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Manage Categories</h2>
          <button
            onClick={handleAddCategory}
            className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 flex items-center transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Category
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <FolderTree className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No categories yet</p>
            <button
              onClick={handleAddCategory}
              className="text-brand-primary hover:text-brand-primary/90 font-medium"
            >
              Add your first category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name (English)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name (Khmer)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description (English)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description (Khmer)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {typeof category.name === "string"
                        ? category.name
                        : category.name?.en}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 font-khmer">
                      {typeof category.name === "string"
                        ? "-"
                        : category.name?.km}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {typeof category.description === "string"
                        ? category.description
                        : category.description?.en || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-khmer">
                      {typeof category.description === "string"
                        ? "-"
                        : category.description?.km || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <CategoryModal
          category={editingCategory}
          onSave={handleSaveCategory}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
        />
      )}
    </>
  );
}
