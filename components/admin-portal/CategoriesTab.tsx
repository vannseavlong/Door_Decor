"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, FolderTree, MoreVertical, GripVertical } from "lucide-react";
import { Category } from "@/types";
import { toast } from "sonner";
import { Loading } from "@/components/ui/spinner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CategoryModal from "./CategoryModal";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/app/(admin-portal)/dashboard/category-actions";
import {
  useCategoriesQuery,
  useInvalidateCategories,
} from "@/lib/react-query/useFirebaseQuery";

// Sortable row component
function SortableRow({ category, onEdit, onDelete }: { 
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr 
      ref={setNodeRef} 
      style={style} 
      className={`hover:bg-gray-50 ${isDragging ? 'bg-gray-100' : ''}`}
    >
      <td className="px-3 sm:px-6 py-3 sm:py-4">
        <button 
          className="cursor-grab active:cursor-grabbing touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </button>
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
        {typeof category.name === "string"
          ? category.name
          : category.name?.en}
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 font-khmer">
        {typeof category.name === "string"
          ? "-"
          : category.name?.km}
      </td>
      <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
        {typeof category.description === "string"
          ? category.description
          : category.description?.en || "-"}
      </td>
      <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 font-khmer">
        {typeof category.description === "string"
          ? "-"
          : category.description?.km || "-"}
      </td>
      <td className="px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded hover:bg-gray-100">
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-32 sm:w-40"
            >
              <DropdownMenuItem
                onSelect={() => onEdit(category)}
                className="text-xs sm:text-sm"
              >
                <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />{" "}
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => onDelete(category.firestoreId || category.id)}
                className="text-xs sm:text-sm"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-red-600" />{" "}
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}

export default function CategoriesTab() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Use React Query for caching
  const { data: categories = [], isLoading: loading } = useCategoriesQuery(
    async () => {
      const data = await getCategories();
      const categoriesData = data.map((d) => ({ ...d, id: d.id || "" })) as Category[];
      // Ensure categories are sorted by sortOrder
      return categoriesData.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    },
  );

  // Use local state for drag-and-drop with memoized initialization
  const [localCategories, setLocalCategories] = useState<Category[]>(() => categories);

  // Use a ref to track if we're dragging to avoid unnecessary updates
  const isDraggingRef = React.useRef(false);
  const prevCategoriesRef = React.useRef<string>('');

  // Update local categories when data actually changes, but only if not currently dragging
  React.useEffect(() => {
    const categoriesKey = JSON.stringify(categories.map(c => ({ id: c.id, sortOrder: c.sortOrder })));
    
    if (!isDraggingRef.current && prevCategoriesRef.current !== categoriesKey) {
      prevCategoriesRef.current = categoriesKey;
      setLocalCategories(categories);
    }
  }, [categories]);

  const invalidateCategories = useInvalidateCategories();

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    isDraggingRef.current = false;

    if (over && active.id !== over.id) {
      const oldIndex = localCategories.findIndex((cat) => cat.id === active.id);
      const newIndex = localCategories.findIndex((cat) => cat.id === over.id);

      const newCategories = arrayMove(localCategories, oldIndex, newIndex);
      
      // Update local state immediately for smooth UX
      setLocalCategories(newCategories);

      // Update sortOrder for all categories
      try {
        const updates = newCategories.map((cat, index) => {
          const docId = cat.firestoreId || cat.id;
          return updateCategory(docId, { sortOrder: index });
        });

        await Promise.all(updates);
        invalidateCategories(); // Refresh cache
        toast.success("Category order updated successfully");
      } catch (error) {
        console.error("Failed to update category order:", error);
        toast.error("Failed to update category order");
        // Revert on error
        setLocalCategories(categories);
      }
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setDeleteId(categoryId);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCategory(deleteId);
      invalidateCategories(); // Refresh cache
      toast.success("Category deleted successfully");
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleSaveCategory = async (category: Category) => {
    // Ensure name/description are always { en, km }
    const safeCategory = {
      ...category,
      name:
        typeof category.name === "string"
          ? { en: category.name, km: "" }
          : category.name,
      description:
        typeof category.description === "string"
          ? { en: category.description, km: "" }
          : (category.description ?? { en: "", km: "" }),
    };

    try {
      if (editingCategory) {
        // Use firestoreId as the document ID
        const docId = editingCategory.firestoreId || editingCategory.id;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, firestoreId, ...categoryData } = safeCategory; // Remove both id fields from update data
        await updateCategory(docId, categoryData);
        toast.success("Category updated successfully");
      } else {
        // When adding new category, set sortOrder to the end
        const maxSortOrder = Math.max(...localCategories.map(c => c.sortOrder ?? 0), -1);
        const categoryWithOrder = { ...safeCategory, sortOrder: maxSortOrder + 1 };
        await addCategory(categoryWithOrder);
        toast.success("Category added successfully");
      }
      invalidateCategories(); // Refresh cache
      setShowModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error("Failed to save category");
    }
  };

  if (loading) return <Loading text="Loading categories..." />;

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Manage Categories
          </h2>
          <button
            onClick={handleAddCategory}
            className="bg-brand-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-brand-primary/90 flex items-center justify-center transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Add Category
          </button>
        </div>

        {localCategories.length === 0 ? (
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase w-12">
                      {/* Drag handle column */}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                      Name (English)
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                      Name (Khmer)
                    </th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                      Description (English)
                    </th>
                    <th className="hidden lg:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                      Description (Khmer)
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <SortableContext
                  items={localCategories.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody className="divide-y divide-gray-200">
                    {localCategories.map((category) => (
                      <SortableRow
                        key={category.id}
                        category={category}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                      />
                    ))}
                  </tbody>
                </SortableContext>
              </table>
            </DndContext>
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

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
