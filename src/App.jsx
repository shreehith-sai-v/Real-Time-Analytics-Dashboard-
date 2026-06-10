import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import ErrorBanner from "./components/ErrorBanner";
import useTraceabilitySimulator from "./hooks/useTraceabilitySimulator";
import DashboardPage from "./pages/DashboardPage";
import InsightsPage from "./pages/InsightsPage";
import OperationsPage from "./pages/OperationsPage";

export default function App() {
  const simulator = useTraceabilitySimulator();
  const [theme, setTheme] = useState(() => localStorage.getItem("trace-theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("trace-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app-shell">
      <DashboardLayout simulator={simulator} theme={theme} onToggleTheme={toggleTheme}>
        {simulator.error ? <ErrorBanner message={simulator.error} /> : null}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage simulator={simulator} />} />
          <Route path="/operations" element={<OperationsPage simulator={simulator} />} />
          <Route path="/insights" element={<InsightsPage simulator={simulator} />} />
        </Routes>
      </DashboardLayout>
    </div>
  );
}
