export default function SkeletonGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Loading metrics">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="panel animate-pulse p-5">
          <div className="h-3 w-24 rounded bg-slate-500/20" />
          <div className="mt-5 h-8 w-20 rounded bg-slate-500/20" />
          <div className="mt-4 h-3 w-32 rounded bg-slate-500/20" />
        </div>
      ))}
    </div>
  );
}
