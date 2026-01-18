import { Loading } from "@/components/ui/spinner";

export default function ProductLoading() {
  return (
    <div className="min-h-screen pt-20">
      <Loading text="Loading product..." size="lg" className="min-h-[60vh]" />
    </div>
  );
}
