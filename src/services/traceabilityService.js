import { seedShipments } from "../data/seed";
import { clamp } from "../utils/metrics";

function vary(value, factor, min, max) {
  const nextValue = value + (Math.random() * factor * 2 - factor);
  return Number(clamp(nextValue, min, max).toFixed(1));
}

function nextRiskLevel(complianceScore, temperature, latencyMinutes) {
  if (complianceScore < 84 || temperature > 7.2 || latencyMinutes > 58) {
    return "High";
  }

  if (complianceScore < 90 || temperature > 6 || latencyMinutes > 42) {
    return "Medium";
  }

  return "Low";
}

export function buildSnapshot(currentShipments) {
  const baseData = currentShipments?.length ? currentShipments : seedShipments;

  const shipments = baseData.map((shipment) => {
    const complianceScore = Math.round(vary(shipment.complianceScore, 4, 75, 99));
    const temperature = vary(shipment.temperature, 0.9, 2.5, 8.5);
    const latencyMinutes = Math.round(vary(shipment.latencyMinutes, 12, 8, 75));
    const scanCount = Math.round(vary(shipment.scanCount, 3, 8, 30));

    return {
      ...shipment,
      complianceScore,
      temperature,
      latencyMinutes,
      scanCount,
      riskLevel: nextRiskLevel(complianceScore, temperature, latencyMinutes),
      lastUpdated: new Date().toISOString(),
    };
  });

  return new Promise((resolve, reject) => {
    const delay = 350 + Math.random() * 500;

    window.setTimeout(() => {
      if (Math.random() < 0.08) {
        reject(new Error("Simulator stream timed out while fetching the next telemetry batch."));
        return;
      }

      resolve(shipments);
    }, delay);
  });
}
