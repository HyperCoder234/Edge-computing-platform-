"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Chart from "../components/Chart";
import { TrendingUp, Activity, Zap, AlertCircle } from "lucide-react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loop = async () => {
      try {
        const res = (await fetchData()) || [];

        const sorted = Array.isArray(res)
          ? res.sort(
              (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            )
          : [];

        setData(sorted.slice(0, 20));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }

      setTimeout(loop, 2000);
    };

    loop();
  }, []);

  const latest = data[0] || {};
  const activeNodes = new Set(data.map((d) => d.nodeId)).size;
  
  // Calculate trends
  const avgCpu = data.length > 0 ? Math.round(data.reduce((sum, d) => sum + (d.cpuUsage || 0), 0) / data.length) : 0;
  const avgTemp = data.length > 0 ? Math.round(data.reduce((sum, d) => sum + (d.temperature || 0), 0) / data.length) : 0;
  const maxTemp = data.length > 0 ? Math.max(...data.map(d => d.temperature || 0)) : 0;

  const cpuStatus = latest.cpuUsage > 80 ? "danger" : latest.cpuUsage > 60 ? "warning" : "success";
  const tempStatus = latest.temperature > 70 ? "danger" : latest.temperature > 50 ? "warning" : "success";

  return (
    <div className="app-container">
      <div className="content-grid">
        
        {/* ====== HEADER SECTION ====== */}
        <div className="page-header animate-slide-down">
          <div className="page-title">
            <h1>System Dashboard</h1>
            <p className="page-subtitle">
              Real-time monitoring and analytics
            </p>
          </div>

          <div className="header-actions">
            <button className="btn">
              <Zap size={16} />
              Deploy
            </button>
            <button className="btn btn-outline">
              <Activity size={16} />
              Logs
            </button>
          </div>
        </div>

        {/* ====== KEY METRICS ====== */}
        <div className="grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {/* Active Nodes */}
          <div className="stat-card">
            <div className="stat-card-label">Active Nodes</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="stat-card-value">{activeNodes}</div>
                <div className="metric-badge" style={{ marginTop: "0.5rem" }}>
                  ✓ Online
                </div>
              </div>
              <Activity size={24} style={{ opacity: 0.4 }} />
            </div>
          </div>

          {/* CPU Usage */}
          <div className="stat-card">
            <div className="stat-card-label">CPU Usage</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="stat-card-value">
                  {latest.cpuUsage || 0}<span className="stat-card-unit">%</span>
                </div>
                <div className={`metric-badge ${cpuStatus}`} style={{ marginTop: "0.5rem" }}>
                  Avg: {avgCpu}%
                </div>
              </div>
              <TrendingUp size={24} style={{ opacity: 0.4 }} />
            </div>
          </div>

          {/* Temperature */}
          <div className="stat-card">
            <div className="stat-card-label">Temperature</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="stat-card-value">
                  {latest.temperature || 0}<span className="stat-card-unit">°C</span>
                </div>
                <div className={`metric-badge ${tempStatus}`} style={{ marginTop: "0.5rem" }}>
                  Max: {maxTemp}°C
                </div>
              </div>
              <AlertCircle size={24} style={{ opacity: 0.4 }} />
            </div>
          </div>
        </div>

        {/* ====== CHARTS SECTION ====== */}
        <div className="grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.2s", marginTop: "2rem" }}>
          <div className="chart-container">
            <h3 className="chart-title">Temperature Trend</h3>
            <Chart data={data} dataKey="temperature" color="#0ea5e9" />
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Average: <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{avgTemp}°C</span>
              </p>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">CPU Usage Trend</h3>
            <Chart data={data} dataKey="cpuUsage" color="#10b981" />
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Average: <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{avgCpu}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* ====== NODE DATA SECTION ====== */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s", marginTop: "2rem" }}>
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <h3 className="chart-title">Node Status</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              Monitoring {activeNodes} active {activeNodes === 1 ? "node" : "nodes"} • Last update: {latest.createdAt ? new Date(latest.createdAt).toLocaleTimeString() : "—"}
            </p>
          </div>

          {data.length > 0 ? (
            <div className="node-grid">
              {data.map((item, index) => (
                <div
                  key={item._id}
                  className="node-card"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <div className="node-card-header">
                    <div>
                      <div className="node-id">{item.nodeId}</div>
                    </div>
                    <div className="node-status"></div>
                  </div>

                  <div className="node-stats">
                    <div className="node-stat-row">
                      <span className="node-stat-label">CPU Usage</span>
                      <span className="node-stat-value">{item.cpuUsage || 0}%</span>
                    </div>

                    <div className="node-stat-row">
                      <span className="node-stat-label">Temperature</span>
                      <span className="node-stat-value">{item.temperature || 0}°C</span>
                    </div>

                    <div className="node-stat-row">
                      <span className="node-stat-label">Memory</span>
                      <span className="node-stat-value">{item.memory || "—"}</span>
                    </div>

                    <div className="node-stat-row">
                      <span className="node-stat-label">Uptime</span>
                      <span className="node-stat-value">{item.uptime || "—"}</span>
                    </div>
                  </div>

                  <div className="node-timestamp">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
              <p style={{ color: "var(--text-muted)" }}>No node data available</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}