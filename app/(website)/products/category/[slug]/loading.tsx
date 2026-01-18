import { Loading } from "@/components/ui/spinner";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen pt-20">
      <Loading text="Loading products..." size="lg" className="min-h-[60vh]" />
    </div>
  );
}
