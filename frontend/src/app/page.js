"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Chart from "../components/Chart";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLoop = async () => {
      const res = (await fetchData()) || [];

      const sorted = Array.isArray(res)
        ? res.sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [];

      setData(sorted.slice(0, 20));

      setTimeout(fetchLoop, 2000);
    };

    fetchLoop();
  }, []);

  const latest = data[0] || {};
  const activeNodes = new Set(data.map((d) => d.nodeId)).size;

  return (
    <div className="space-y-6">

      {/* ACTIONS */}
      <div className="flex justify-between items-center gap-10">
        <div>
          <h2 className="text-strong text-xl font-semibold">
            Overview
          </h2>
          <p className="text-muted text-sm">
            Live system intelligence
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn">Deploy</button>
          <button className="btn-outline">Logs</button>
        </div>
      </div>

      {/* STATS */}
      <div className="flex justify-between gap-5">

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
          <h3 className="text-strong mb-3">Temperature</h3>
          <Chart data={data} dataKey="temperature" color="#38bdf8" />
        </div>

        <div className="card">
          <h3 className="text-strong mb-3">CPU Usage</h3>
          <Chart data={data} dataKey="cpuUsage" color="#22c55e" />
        </div>

      </div>

    </div>
  );
}