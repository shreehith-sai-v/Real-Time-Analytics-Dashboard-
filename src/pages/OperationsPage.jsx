import MetricCard from "../components/MetricCard";

function getProgress(shipment) {
  if (shipment.stage === "Delivered") return 100;
  if (shipment.stage === "Inspection") return 68;
  return 42;
}

export default function OperationsPage({ simulator }) {
  const { shipments, derived } = simulator;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
      <section className="panel p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="panel-title">Operational Monitoring</p>
            <h2 className="heading-text mt-1 text-lg font-semibold">Shipment movement status</h2>
          </div>
          <p className="muted-text text-sm">Each lot updates predictably through app state.</p>
        </div>

        <div className="mt-5 space-y-4">
          {shipments.map((shipment) => {
            const progress = getProgress(shipment);

            return (
              <article key={shipment.id} className="soft-surface rounded-xl p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="heading-text text-base font-semibold">{shipment.id}</h3>
                    <p className="muted-text text-sm">
                      {shipment.origin} to {shipment.destination}
                    </p>
                  </div>
                  <div className="grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <span className="soft-text block text-xs">Scans</span>
                      <span className="heading-text font-semibold">{shipment.scanCount}</span>
                    </div>
                    <div>
                      <span className="soft-text block text-xs">Temperature</span>
                      <span className="heading-text font-semibold">{shipment.temperature} deg C</span>
                    </div>
                    <div>
                      <span className="soft-text block text-xs">Updated</span>
                      <span className="heading-text font-semibold">
                        {new Date(shipment.lastUpdated).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="soft-text">Trace progress</span>
                    <span className="muted-text">{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-500/20">
                    <div className="h-full rounded-full bg-cyan-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4">
        <MetricCard
          title="Average Temperature"
          value={`${derived.averageTemperature} deg C`}
          detail="Helps simulate cold-chain quality control."
          tone="cyan"
        />
        <MetricCard
          title="Delivered Lots"
          value={derived.deliveredCount}
          detail="Useful as a derived state example."
          tone="emerald"
        />
        <MetricCard
          title="Global State Need"
          value="Low"
          detail="This project keeps state co-located in one simulator hook."
          tone="amber"
        />
      </section>
    </div>
  );
}
