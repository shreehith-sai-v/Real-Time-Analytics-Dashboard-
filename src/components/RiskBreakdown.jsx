const riskMeta = {
  Low: { label: "Low", bar: "bg-emerald-500" },
  Medium: { label: "Medium", bar: "bg-amber-500" },
  High: { label: "High", bar: "bg-rose-500" },
};

export default function RiskBreakdown({ riskCounts, total }) {
  return (
    <section className="panel p-5">
      <p className="panel-title">Risk Mix</p>
      <h2 className="heading-text mt-1 text-lg font-semibold">Shipment health distribution</h2>

      <div className="mt-5 space-y-4">
        {Object.entries(riskMeta).map(([risk, meta]) => {
          const count = riskCounts[risk] || 0;
          const percentage = total === 0 ? 0 : Math.round((count / total) * 100);

          return (
            <div key={risk}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="heading-text font-medium">{meta.label}</span>
                <span className="muted-text">
                  {count} lots | {percentage}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-500/20">
                <div className={`h-full rounded-full ${meta.bar}`} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
