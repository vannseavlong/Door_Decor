type Props = { params: { id: string } };

export default function ProductPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Product: {params.id}</h1>
      <p className="mt-4 text-sm text-gray-600">
        Product details will be shown here.
      </p>
    </div>
  );
}
