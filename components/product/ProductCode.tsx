import React from "react";

interface ProductCodeRow {
  label: string;
  value: string;
}

interface ProductCodeProps {
  code: string;
  rows: ProductCodeRow[];
}

const ProductCode: React.FC<ProductCodeProps> = ({ code, rows }) => {
  return (
    <div className="w-full">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-6">{code}</h2>
      <div className="border-t border-gray-200">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-center py-4 border-b border-gray-200 last:border-b-0"
          >
            <div className="w-1/3 font-semibold text-gray-800 text-lg">
              {row.label}
            </div>
            <div className="w-2/3 text-gray-700 text-lg">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCode;
