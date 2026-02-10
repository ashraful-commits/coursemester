export function CourseCardSkeleton() {
  return (
    <div className="group overflow-hidden border-0 shadow-lg rounded-2xl">
      {/* Course Image Skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse"></div>
      
      <div className="p-5 space-y-4">
        {/* Category and Level Badges Skeleton */}
        <div className="flex justify-between items-center mb-3">
          <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Rating and Students Skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Instructor Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-1">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Duration and Lessons Skeleton */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Price and CTA Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}