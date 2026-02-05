export default function ProductsSkeleton() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mb-8 animate-pulse">
        <div className="h-7 md:h-9 bg-gray-200 rounded-lg w-48 mb-2" />
      </div>

      <div className="space-y-10">
        {[1, 2].map((section) => (
          <div key={section}>
            <div className="flex items-center justify-between mb-6 animate-pulse">
              <div className="h-6 md:h-7 bg-gray-200 rounded-lg w-40" />
              <div className="h-4 bg-gray-200 rounded-lg w-28" />
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="animate-pulse space-y-3">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg aspect-[4/3]" />
                  <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
                </div>
              ))}
            </div>

            {section < 2 && (
              <hr className="mt-10 border-t border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
