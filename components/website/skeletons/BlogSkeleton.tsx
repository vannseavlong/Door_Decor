export default function BlogSkeleton() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mb-8 animate-pulse">
        <div className="h-7 md:h-9 bg-gray-200 rounded-lg w-56" />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="animate-pulse space-y-3">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg aspect-video" />
            <div className="h-5 bg-gray-200 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 rounded-lg w-4/5" />
            <div className="h-4 bg-gray-200 rounded-lg w-3/5" />
          </div>
        ))}
      </div>
    </section>
  );
}
