import React from "react";
import {
  MaterialIcon,
  DimensionsIcon,
  WeightIcon,
  CertificationsIcon,
} from "@/components/product/specIcons";

interface SpecificationProps {
  specsArray: { label: string; value: string }[];
}

const Specification: React.FC<SpecificationProps> = ({ specsArray }) => {
  if (!specsArray.length) return null;
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Specifications</h3>
      <div className="space-y-3 text-sm text-gray-700">
        {specsArray.map((s, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600 mt-1">
              {s.label.toLowerCase().includes("material") ? (
                <MaterialIcon className="w-3 h-3" />
              ) : s.label.toLowerCase().includes("dimension") ||
                s.label.toLowerCase().includes("size") ? (
                <DimensionsIcon className="w-3 h-3" />
              ) : s.label.toLowerCase().includes("weight") ? (
                <WeightIcon className="w-3 h-3" />
              ) : (
                <CertificationsIcon className="w-3 h-3" />
              )}
            </div>
            <div>
              <span className="font-medium text-gray-800">{s.label}:</span>
              <span className="ml-2 text-gray-600">{s.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specification;
