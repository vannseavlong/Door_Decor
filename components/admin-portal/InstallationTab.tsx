"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import InstallationModal from "./InstallationModal";
import { InstallationRecord } from "@/lib/firebase/installations";
import {
  getInstallations,
  addInstallation,
  updateInstallation,
  deleteInstallation,
} from "@/app/(admin-portal)/dashboard/installation-actions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  useInstallationsQuery,
  useInvalidateInstallations,
} from "@/lib/react-query/useFirebaseQuery";

export default function InstallationTab() {
  const [editingInstallation, setEditingInstallation] =
    useState<InstallationRecord | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Use React Query for caching
  const { data: installations = [], isLoading: loading } =
    useInstallationsQuery(getInstallations);
  const invalidateInstallations = useInvalidateInstallations();

  const handleAddInstallation = () => {
    setEditingInstallation(null);
    setShowModal(true);
  };

  const handleEditInstallation = (installation: InstallationRecord) => {
    setEditingInstallation(installation);
    setShowModal(true);
  };

  const handleDeleteInstallation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this installation?")) {
      try {
        await deleteInstallation(id);
        invalidateInstallations(); // Refresh cache
        toast.success("Installation deleted successfully");
      } catch {
        toast.error("Failed to delete installation");
      }
    }
  };

  const handleSaveInstallation = async (
    installation: Omit<InstallationRecord, "id">
  ) => {
    try {
      if (editingInstallation) {
        await updateInstallation(editingInstallation.id, installation);
        toast.success("Installation updated successfully");
      } else {
        await addInstallation(installation);
        toast.success("Installation added successfully");
      }
      invalidateInstallations(); // Refresh cache
      setShowModal(false);
      setEditingInstallation(null);
    } catch {
      toast.error("Failed to save installation");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Manage Installations
          </h2>
          <button
            onClick={handleAddInstallation}
            className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 flex items-center transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Installation
          </button>
        </div>

        {installations.length === 0 ? (
          <div className="p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No installations yet</p>
            <button
              onClick={handleAddInstallation}
              className="text-brand-primary hover:text-brand-primary/90 font-medium"
            >
              Add your first installation
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {installations.map((installation) => (
                  <tr key={installation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {installation.image && (
                        <div className="relative w-16 h-16 rounded overflow-hidden">
                          <Image
                            src={installation.image}
                            alt={installation.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {installation.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {installation.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {installation.location || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {installation.date || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-gray-100">
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onSelect={() =>
                                handleEditInstallation(installation)
                              }
                            >
                              <Edit2 className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() =>
                                handleDeleteInstallation(installation.id)
                              }
                            >
                              <Trash2 className="w-4 h-4 mr-2 text-red-600" />{" "}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
        <InstallationModal
          installation={editingInstallation}
          onSave={handleSaveInstallation}
          onClose={() => {
            setShowModal(false);
            setEditingInstallation(null);
          }}
          open={showModal}
        />
      )}
    </>
  );
}
