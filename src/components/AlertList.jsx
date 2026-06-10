export default function AlertList({ anomalies }) {
  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="panel-title">Anomaly Detection</p>
          <h2 className="heading-text mt-1 text-lg font-semibold">Latency z-score alerts</h2>
        </div>
        <p className="muted-text text-sm">Flags shipments above normal delay patterns</p>
      </div>

      <div className="mt-5 space-y-3">
        {anomalies.length ? (
          anomalies.map((shipment) => (
            <article
              key={shipment.id}
              className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="heading-text font-semibold">{shipment.id}</p>
                  <p className="text-sm text-rose-700">
                    {shipment.origin} to {shipment.destination}
                  </p>
                </div>
                <div className="text-sm text-rose-700">
                  Z-score: {shipment.latencyZScore.toFixed(2)} | Latency: {shipment.latencyMinutes} min
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-700">
            No critical latency anomalies in the current simulation window.
          </div>
        )}
      </div>
    </section>
  );
}
