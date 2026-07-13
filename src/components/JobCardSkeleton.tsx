export default function JobCardSkeleton() {
  return (
    <div className="card-surface flex h-full flex-col gap-4 p-5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
      </div>
      <div className="flex gap-1.5">
        <div className="skeleton h-5 w-14 rounded-full" />
        <div className="skeleton h-5 w-14 rounded-full" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
      <div className="mt-auto border-t border-graphite-100 pt-4">
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
      <div className="skeleton h-4 w-1/3 rounded" />
    </div>
  );
}
