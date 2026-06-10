import { memo } from "react";
import { stageColors } from "../data/seed";

function ShipmentTable({ shipments }) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="panel-title">Traceability Feed</p>
          <h2 className="heading-text mt-1 text-lg font-semibold">Live shipment metrics</h2>
        </div>
        <span className="muted-text text-sm">{shipments.length} active lots</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="table-head">
            <tr>
              <th className="px-5 py-3 font-medium">Lot</th>
              <th className="px-5 py-3 font-medium">Route</th>
              <th className="px-5 py-3 font-medium">Stage</th>
              <th className="px-5 py-3 font-medium">Compliance</th>
              <th className="px-5 py-3 font-medium">Temp</th>
              <th className="px-5 py-3 font-medium">Latency</th>
              <th className="px-5 py-3 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="table-row">
                <td className="px-5 py-4 font-semibold">{shipment.id}</td>
                <td className="muted-text px-5 py-4">
                  <span className="block">{shipment.origin}</span>
                  <span className="soft-text block text-xs">{shipment.destination}</span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      stageColors[shipment.stage]
                    }`}
                  >
                    {shipment.stage}
                  </span>
                </td>
                <td className="px-5 py-4">{shipment.complianceScore}%</td>
                <td className="px-5 py-4">{shipment.temperature} deg C</td>
                <td className="px-5 py-4">{shipment.latencyMinutes} min</td>
                <td className="px-5 py-4">{shipment.riskLevel}</td>
              </tr>
            ))}
            {!shipments.length ? (
              <tr>
                <td className="muted-text px-5 py-8 text-center" colSpan="7">
                  No shipments match the current controls.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(ShipmentTable);
