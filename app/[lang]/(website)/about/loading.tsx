import { Loading } from "@/components/ui/spinner";

export default function AboutLoading() {
  return (
    <div className="min-h-screen pt-20">
      <Loading
        text="Loading about page..."
        size="lg"
        className="min-h-[60vh]"
      />
    </div>
  );
}
