import { Loading } from "@/components/ui/spinner";

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
      <div className="pt-16 sm:pt-20 pb-16">
        <Loading
          text="Loading admin dashboard..."
          size="lg"
          className="min-h-[60vh]"
        />
      </div>
    </div>
  );
}
