import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Overview" },
  { to: "/operations", label: "Operations" },
  { to: "/insights", label: "Insights" },
];

export default function DashboardLayout({ simulator, theme, onToggleTheme, children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="panel overflow-hidden p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="panel-title">Real-Time Analytics Simulator</p>
            <h1 className="heading-text mt-3 text-3xl font-bold sm:text-4xl">
              Supply Chain Traceability Command Center
            </h1>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="soft-surface rounded-xl px-4 py-3 text-sm">
              <span className="soft-text block text-xs uppercase tracking-[0.2em]">
                Last Refresh
              </span>
              <span className="heading-text">{simulator.lastRefresh || "Starting stream..."}</span>
            </div>
            <button
              type="button"
              onClick={() => simulator.refreshData("manual")}
              className="button-primary focus-ring"
            >
              {simulator.isLoading ? "Refreshing..." : "Manual Refresh"}
            </button>
            <button type="button" onClick={onToggleTheme} className="button-secondary focus-ring">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        <nav className="mt-6 flex flex-wrap gap-3" aria-label="Dashboard sections">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `focus-ring rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-300 text-slate-950"
                    : "soft-surface muted-text hover:brightness-110"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
