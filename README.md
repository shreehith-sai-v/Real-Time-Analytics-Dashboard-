# Real-Time-Analytics-Dashboard-
# Supply Chain Traceability Dashboard Simulator

A lightweight single-page React application that simulates a real-time supply-chain analytics dashboard. This project is intended as an educational demo that showcases component-driven UI, derived metrics, route-based views, and a small simulator backend to model streaming shipment updates.

## Features

- Real-time simulation of shipment data with controllable refresh cadence
- Dashboard overview with metric cards, charts, and anomaly indicators
- Operations and Insights pages separated by route
- Reusable, accessible components and responsive layout (Tailwind CSS)
- Derived metrics and simple anomaly detection (z-score based latency alerts)
- Built with Vite for fast development and small production builds

## Tech stack

- React 18
- Vite
- Tailwind CSS
- React Router

## Project structure

- `index.html` — Vite entry page
- `src/main.jsx` — app bootstrap and router
- `src/App.jsx` — top-level routes and layout
- `src/pages/` — `DashboardPage.jsx`, `OperationsPage.jsx`, `InsightsPage.jsx`
- `src/components/` — UI building blocks (cards, charts, tables, skeletons)
- `src/hooks/useTraceabilitySimulator.js` — central hook managing simulated state
- `src/services/traceabilityService.js` — simulator that emits async updates
- `src/utils/metrics.js` — derived calculations (averages, z-score, etc.)
- `src/data/seed.js` — initial seed data for the simulator

## Key files (brief)

- `src/services/traceabilityService.js` — simulates delayed API responses and injects variability into shipment records.
- `src/hooks/useTraceabilitySimulator.js` — orchestrates refresh loop, loading/error state, and exposes actions (start/stop/refresh).
- `src/components/*` — `MetricCard`, `HistoryChart`, `ShipmentTable`, and layout helpers used across pages.
- `src/utils/metrics.js` — contains functions to compute averages, percentiles, and z-scores used for anomaly detection.

## Prerequisites

- Node.js 18+ and npm

## Install and run

Install dependencies once:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## How it works (high level)

1. The app seeds a small set of shipment records from `src/data/seed.js`.
2. `traceabilityService` periodically returns updated snapshots that include small randomized changes (latency, compliance, status).
3. `useTraceabilitySimulator` runs the refresh lifecycle, merging updates into local state, tracking history, and computing derived metrics.
4. Components subscribe to the hook's state and render metric cards, tables, and charts. Anomalies are flagged using z-score thresholds computed in `src/utils/metrics.js`.

## Development notes

- To change simulation cadence or variance, edit `src/services/traceabilityService.js` and the hook's timer in `useTraceabilitySimulator.js`.
- Components are intentionally small and focused; reuse `MetricCard` and `HistoryChart` for new metrics.

## Testing & Linting

There are no automated tests included. For manual verification:

- Open the app with `npm run dev` and verify the dashboard updates over time.
- Use browser devtools to throttle network/CPU and confirm UI remains responsive.

## Contributing

Contributions are welcome — open an issue or submit a pull request. Keep changes small and focused; add tests where appropriate and update this README when adding features.

## License

Add a license file (for example, MIT) if you intend to publish or share this project.

---

If you'd like, I can also:

- Add code comments to `useTraceabilitySimulator.js` explaining the lifecycle
- Create a minimal CONTRIBUTING.md or add a sample `LICENSE`
- Add a short demo GIF or screenshot and instructions to capture it

File saved as README.md in the project root.
