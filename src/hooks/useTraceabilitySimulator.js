import { useEffect, useMemo, useRef, useState } from "react";
import { buildSnapshot } from "../services/traceabilityService";
import { average, zScore } from "../utils/metrics";

const REFRESH_INTERVAL = 5000;

export default function useTraceabilitySimulator() {
  const [shipments, setShipments] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState("");
  const refreshLock = useRef(false);
  const shipmentsRef = useRef([]);

  useEffect(() => {
    shipmentsRef.current = shipments;
  }, [shipments]);

  async function refreshData(source = "auto") {
    if (refreshLock.current) return;

    refreshLock.current = true;
    setError("");
    setIsLoading(true);

    try {
      const nextShipments = await buildSnapshot(shipmentsRef.current);
      setShipments(nextShipments);
      setLastRefresh(new Date().toLocaleTimeString());
      setHistory((currentHistory) => {
        const batchScore = average(nextShipments.map((item) => item.complianceScore));
        const nextHistory = [
          ...currentHistory,
          {
            timestamp: new Date().toLocaleTimeString(),
            source,
            batchScore: Number(batchScore.toFixed(1)),
          },
        ];
        return nextHistory.slice(-10);
      });
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      refreshLock.current = false;
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshData("initial");

    const intervalId = window.setInterval(() => {
      refreshData("auto");
    }, REFRESH_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, []);

  const derived = useMemo(() => {
    const complianceValues = shipments.map((item) => item.complianceScore);
    const latencyValues = shipments.map((item) => item.latencyMinutes);
    const temperatureValues = shipments.map((item) => item.temperature);
    const riskyShipments = shipments.filter((item) => item.riskLevel === "High").length;
    const deliveredCount = shipments.filter((item) => item.stage === "Delivered").length;
    const riskCounts = shipments.reduce(
      (counts, item) => ({
        ...counts,
        [item.riskLevel]: counts[item.riskLevel] + 1,
      }),
      { Low: 0, Medium: 0, High: 0 },
    );
    const averageCompliance = average(complianceValues);
    const averageLatency = average(latencyValues);
    const averageTemperature = average(temperatureValues);

    const anomalies = shipments
      .map((item) => ({
        ...item,
        latencyZScore: zScore(item.latencyMinutes, latencyValues),
      }))
      .filter((item) => item.latencyZScore > 1);

    return {
      riskyShipments,
      deliveredCount,
      averageCompliance: Number(averageCompliance.toFixed(1)),
      averageLatency: Number(averageLatency.toFixed(1)),
      averageTemperature: Number(averageTemperature.toFixed(1)),
      anomalies,
      riskCounts,
      throughputRate:
        shipments.length === 0 ? 0 : Number(((deliveredCount / shipments.length) * 100).toFixed(1)),
    };
  }, [shipments]);

  return {
    shipments,
    history,
    isLoading,
    error,
    lastRefresh,
    refreshData,
    derived,
  };
}
