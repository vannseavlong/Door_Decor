export default function HeroSkeleton() {
  return (
    <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <div className="h-6 md:h-10 lg:h-12 bg-gray-300 rounded-lg w-48 md:w-64 lg:w-80 mx-auto" />
          <div className="h-4 md:h-5 lg:h-6 bg-gray-300 rounded-lg w-64 md:w-80 lg:w-96 mx-auto" />
        </div>
      </div>
    </div>
  );
}
