const stageOptions = ["All", "Transit", "Inspection", "Delivered"];
const riskOptions = ["All", "Low", "Medium", "High"];
const sortOptions = [
  { value: "risk", label: "Risk first" },
  { value: "latency", label: "Highest latency" },
  { value: "compliance", label: "Best compliance" },
  { value: "temperature", label: "Warmest lots" },
];

export default function DashboardControls({ filters, onFiltersChange, resultCount }) {
  function updateFilter(key, value) {
    onFiltersChange((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="panel-title">Control Surface</p>
          <h2 className="heading-text mt-1 text-lg font-semibold">Filter live traceability data</h2>
          <p className="muted-text mt-1 text-sm">
            {resultCount} shipment lots match the current dashboard controls.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-1 text-sm">
            <span className="soft-text">Search lot or route</span>
            <input
              className="control-field focus-ring"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Try LOT or city"
              type="search"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="soft-text">Stage</span>
            <select
              className="control-field focus-ring"
              value={filters.stage}
              onChange={(event) => updateFilter("stage", event.target.value)}
            >
              {stageOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="soft-text">Risk</span>
            <select
              className="control-field focus-ring"
              value={filters.risk}
              onChange={(event) => updateFilter("risk", event.target.value)}
            >
              {riskOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="soft-text">Sort by</span>
            <select
              className="control-field focus-ring"
              value={filters.sortBy}
              onChange={(event) => updateFilter("sortBy", event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}
