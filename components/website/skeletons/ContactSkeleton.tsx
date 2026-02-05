export default function ContactSkeleton() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mb-8 animate-pulse">
        <div className="h-7 md:h-9 bg-gray-200 rounded-lg w-48 mx-auto" />
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
        {[1, 2].map((col) => (
          <div key={col} className="space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-lg w-32" />
            <div className="h-4 bg-gray-200 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
            <div className="h-4 bg-gray-200 rounded-lg w-4/6" />
          </div>
        ))}
      </div>
    </section>
  );
}
