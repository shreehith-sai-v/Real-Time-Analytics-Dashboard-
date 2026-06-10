import AlertList from "../components/AlertList";
import HistoryChart from "../components/HistoryChart";

export default function InsightsPage({ simulator }) {
  const { history, derived } = simulator;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,0.95fr]">
      <HistoryChart history={history} />
      <AlertList anomalies={derived.anomalies} />
    </div>
  );
}
