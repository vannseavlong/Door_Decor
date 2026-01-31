import { Loading } from "@/components/ui/spinner";

export default function WebsiteLoading() {
  return (
    <div className="min-h-screen">
      <Loading text="Loading..." size="lg" className="min-h-screen" />
    </div>
  );
}
