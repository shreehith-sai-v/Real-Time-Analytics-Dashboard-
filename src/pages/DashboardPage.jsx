import { useMemo, useState } from "react";
import DashboardControls from "../components/DashboardControls";
import MetricCard from "../components/MetricCard";
import RiskBreakdown from "../components/RiskBreakdown";
import ShipmentTable from "../components/ShipmentTable";
import SkeletonGrid from "../components/SkeletonGrid";

const riskRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export default function DashboardPage({ simulator }) {
  const { shipments, derived, isLoading } = simulator;
  const [filters, setFilters] = useState({
    query: "",
    stage: "All",
    risk: "All",
    sortBy: "risk",
  });

  const visibleShipments = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return shipments
      .filter((shipment) => {
        const searchableText = `${shipment.id} ${shipment.origin} ${shipment.destination}`.toLowerCase();
        const matchesQuery = query ? searchableText.includes(query) : true;
        const matchesStage = filters.stage === "All" || shipment.stage === filters.stage;
        const matchesRisk = filters.risk === "All" || shipment.riskLevel === filters.risk;

        return matchesQuery && matchesStage && matchesRisk;
      })
      .sort((first, second) => {
        if (filters.sortBy === "latency") {
          return second.latencyMinutes - first.latencyMinutes;
        }

        if (filters.sortBy === "compliance") {
          return second.complianceScore - first.complianceScore;
        }

        if (filters.sortBy === "temperature") {
          return second.temperature - first.temperature;
        }

        return riskRank[second.riskLevel] - riskRank[first.riskLevel];
      });
  }, [filters, shipments]);

  return (
    <div className="space-y-6">
      {isLoading && shipments.length === 0 ? (
        <SkeletonGrid />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Average Compliance"
            value={`${derived.averageCompliance}%`}
            detail="Derived from all active shipment batches."
            tone="cyan"
          />
          <MetricCard
            title="Delivered Throughput"
            value={`${derived.throughputRate}%`}
            detail="Percentage of lots already delivered."
            tone="emerald"
          />
          <MetricCard
            title="Average Latency"
            value={`${derived.averageLatency} min`}
            detail="Mean delay observed across the simulator."
            tone="amber"
          />
          <MetricCard
            title="High Risk Lots"
            value={derived.riskyShipments}
            detail="Risk is derived from compliance, temperature, and latency."
            tone="rose"
          />
        </section>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr,0.45fr]">
        <div className="space-y-6">
          <DashboardControls
            filters={filters}
            onFiltersChange={setFilters}
            resultCount={visibleShipments.length}
          />
          <ShipmentTable shipments={visibleShipments} />
        </div>
        <RiskBreakdown riskCounts={derived.riskCounts} total={shipments.length} />
      </div>
    </div>
  );
}
