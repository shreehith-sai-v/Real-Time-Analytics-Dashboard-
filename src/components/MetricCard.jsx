import { memo } from "react";

function MetricCard({ title, value, detail, tone = "cyan" }) {
  const toneClasses = {
    cyan: "from-cyan-400/20 to-cyan-500/5",
    emerald: "from-emerald-400/20 to-emerald-500/5",
    amber: "from-amber-400/20 to-amber-500/5",
    rose: "from-rose-400/20 to-rose-500/5",
  };

  return (
    <article className="panel relative overflow-hidden p-5">
      <div className={`absolute inset-0 bg-gradient-to-br ${toneClasses[tone]}`} aria-hidden="true" />
      <div className="relative">
        <p className="panel-title">{title}</p>
        <p className="heading-text mt-4 text-3xl font-bold">{value}</p>
        <p className="muted-text mt-2 text-sm">{detail}</p>
      </div>
    </article>
  );
}

export default memo(MetricCard);
