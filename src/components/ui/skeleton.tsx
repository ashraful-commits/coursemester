function SkeletonBase({ className = "" }: { className?: string }) {
  return (
    <div
      className={`skeleton rounded-xl ${className}`}
    />
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
      {/* Image placeholder */}
      <SkeletonBase className="h-56 rounded-none rounded-t-[2.5rem]" />

      <div className="p-8 space-y-5">
        {/* Badge row */}
        <div className="flex gap-3">
          <SkeletonBase className="h-7 w-28 rounded-xl" />
        </div>

        {/* Title */}
        <div className="space-y-2.5">
          <SkeletonBase className="h-7 w-full" />
          <SkeletonBase className="h-7 w-3/4" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-5/6" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <SkeletonBase className="h-12 rounded-2xl" />
          <SkeletonBase className="h-12 rounded-2xl" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <SkeletonBase className="h-8 w-24 rounded-xl" />
          <SkeletonBase className="h-8 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function DashboardStatSkeleton() {
  return (
    <div className="glass-card rounded-[2.5rem] border-white/5 p-8">
      <div className="flex justify-between items-start mb-8">
        <SkeletonBase className="w-14 h-14 rounded-2xl" />
        <SkeletonBase className="w-16 h-6 rounded-full" />
      </div>
      <SkeletonBase className="h-10 w-1/2 mb-2" />
      <SkeletonBase className="h-4 w-2/3" />
    </div>
  )
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <SkeletonBase className={className} />
}