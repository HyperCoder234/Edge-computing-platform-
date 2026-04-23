"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Chart from "../components/Chart";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchLoop = async () => {
      try {
        const res = (await fetchData()) || [];

        const sorted = Array.isArray(res)
          ? res.sort(
              (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            )
          : [];

        if (isMounted) {
          setData(sorted.slice(0, 20));
        }
      } catch (err) {
        console.error(err);
      }

      setTimeout(fetchLoop, 2000);
    };

    fetchLoop();

    return () => {
      isMounted = false;
    };
  }, []);

  const latest = data[0] || {};

  const activeNodes = new Set(data.map((d) => d.nodeId)).size;

  const avgCpu =
    data.reduce((acc, d) => acc + (d.cpuUsage || 0), 0) /
    (data.length || 1);

  return (
    <div className="space-y-6">

      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-strong text-xl font-semibold">
            Overview
          </h2>
          <p className="text-muted text-sm">
            Real-time system metrics
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn">Deploy</button>
          <button className="btn-outline">Logs</button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="card">
          <p className="text-muted text-sm">Active Nodes</p>
          <h2 className="text-strong text-2xl font-bold mt-2">
            {activeNodes}
          </h2>
        </div>

        <div className="card">
          <p className="text-muted text-sm">CPU Usage</p>
          <h2 className="text-strong text-2xl font-bold mt-2">
            {Math.round(latest.cpuUsage || 0)}%
          </h2>
        </div>

        <div className="card">
          <p className="text-muted text-sm">Temperature</p>
          <h2 className="text-strong text-2xl font-bold mt-2">
            {Math.round(latest.temperature || 0)}°C
          </h2>
        </div>

      </div>

      {/* GRAPHS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="card">
          <h3 className="text-strong mb-3">Temperature Trend</h3>
          <Chart data={data} dataKey="temperature" color="#3b82f6" />
        </div>

        <div className="card">
          <h3 className="text-strong mb-3">CPU Usage Trend</h3>
          <Chart data={data} dataKey="cpuUsage" color="#22c55e" />
        </div>

      </div>

      {/* SYSTEM LOAD + STATUS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="card">
          <h3 className="text-strong mb-4">System Load</h3>

          <Bar label="CPU Usage" value={latest.cpuUsage || 0} />
          <Bar label="Temperature" value={latest.temperature || 0} />
          <Bar label="Avg CPU" value={avgCpu} />
        </div>

        <div className="card">
          <h3 className="text-strong mb-3">Node Status</h3>

          {[...new Set(data.map((d) => d.nodeId))].map((node, i) => {
            const latestNode = data.find(
              (d) => d.nodeId === node
            );

            return (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-white/10"
              >
                <span className="text-muted">{node}</span>
                <span
                  className={
                    latestNode?.cpuUsage > 80
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {latestNode?.cpuUsage > 80
                    ? "Degraded"
                    : "Healthy"}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* CONTROL PANEL */}
      <div className="card">
        <h3 className="text-strong mb-4">Control Panel</h3>

        <div className="flex gap-3">
          <button className="btn">Restart Node</button>
          <button className="btn-outline">Boost CPU</button>
          <button className="btn-outline">Fetch Status</button>
        </div>
      </div>

      {/* ACTIVITY */}
      <div className="card">
        <h3 className="text-strong mb-3">Recent Activity</h3>

        {data.slice(0, 5).map((item) => (
          <div
            key={item._id}
            className="py-2 border-b border-white/10 text-muted"
          >
            Node {item.nodeId} → CPU {item.cpuUsage}% | Temp{" "}
            {item.temperature}°C
          </div>
        ))}
      </div>

    </div>
  );
}

/* BAR COMPONENT */
function Bar({ label, value }) {
  const safeValue = Math.round(value || 0);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted">{label}</span>
        <span className="text-strong">{safeValue}%</span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded">
        <div
          className="h-2 bg-white rounded"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}