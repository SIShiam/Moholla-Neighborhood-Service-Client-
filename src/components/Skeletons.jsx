export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100" aria-hidden="true">
      <div className="skeleton aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="skeleton h-5 w-24" />
        <div className="skeleton h-6 w-4/5" />
        <div className="skeleton h-4 w-3/5" />
        <div className="skeleton mt-2 h-2 w-full" />
        <div className="skeleton mt-auto h-9 w-32" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading events">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container-page py-12" role="status" aria-label="Loading">
      <div className="skeleton h-9 w-64" />
      <div className="skeleton mt-4 h-4 w-96 max-w-full" />
      <div className="skeleton mt-10 h-64 w-full" />
    </div>
  );
}
