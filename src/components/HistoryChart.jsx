export default function HistoryChart({ history }) {
  const peak = Math.max(...history.map((point) => point.batchScore), 100);

  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="panel-title">Refresh History</p>
          <h2 className="heading-text mt-1 text-lg font-semibold">Compliance trend</h2>
        </div>
        <p className="muted-text text-sm">Shows the last 10 async updates</p>
      </div>

      <div className="mt-6 flex h-52 items-end gap-3" aria-label="Compliance trend chart" role="img">
        {history.map((point) => (
          <div key={`${point.timestamp}-${point.source}`} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500 to-emerald-300"
              style={{ height: `${(point.batchScore / peak) * 100}%` }}
              title={`${point.batchScore}% at ${point.timestamp}`}
            />
            <span className="soft-text text-[11px]">{point.timestamp}</span>
          </div>
        ))}
        {!history.length ? (
          <div className="muted-text flex h-full w-full items-center justify-center text-sm">
            Waiting for the first simulator update.
          </div>
        ) : null}
      </div>
    </section>
  );
}
