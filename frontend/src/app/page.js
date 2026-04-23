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
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* TOP STATS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="glass hover-card p-5 glow">
          <p className="text-gray-400 text-sm">ACTIVE NODES</p>
          <h2 className="text-3xl font-bold mt-2">{activeNodes}</h2>
          <p className="text-gray-500 text-sm">Live connected nodes</p>
        </div>

        <div className="glass hover-card p-5 glow">
          <p className="text-gray-400 text-sm">NETWORK HEALTH</p>
          <h2 className="text-3xl font-bold mt-2">
            {Math.min(100, Math.round(100 - avgCpu / 2))}%
          </h2>
          <p className="text-gray-500 text-sm">
            Based on system load
          </p>
        </div>

      </div>

      {/* GRAPHS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="glass hover-card p-4">
          <h2 className="mb-2">Temperature Trend</h2>
          <Chart data={data} dataKey="temperature" color="#3b82f6" />
        </div>

        <div className="glass hover-card p-4">
          <h2 className="mb-2">CPU Usage Trend</h2>
          <Chart data={data} dataKey="cpuUsage" color="#22c55e" />
        </div>

      </div>

      {/* SYSTEM LOAD */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="glass hover-card p-5">
          <h2 className="mb-4">System Load</h2>

          <Bar label="CPU Usage" value={latest.cpuUsage || 0} />
          <Bar label="Temperature" value={latest.temperature || 0} />
          <Bar label="Avg CPU" value={avgCpu} />
        </div>

        {/* NODE STATUS */}
        <div className="glass hover-card p-5">
          <h2 className="mb-3">Node Status</h2>

          {[...new Set(data.map((d) => d.nodeId))].map((node, i) => {
            const latestNode = data.find(
              (d) => d.nodeId === node
            );

            return (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-white/10"
              >
                <span>{node}</span>
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

    </div>
  );
}

/* BAR */
function Bar({ label, value }) {
  const safeValue = Math.round(value || 0);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}