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

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div className="flex gap-3">
          <button className="btn">Deploy</button>
          <button className="btn-outline">Logs</button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="card">
          <p className="text-gray-400 text-sm">Active Nodes</p>
          <h2 className="text-2xl font-bold mt-2">{activeNodes}</h2>
        </div>

        <div className="card">
          <p className="text-gray-400 text-sm">CPU Usage</p>
          <h2 className="text-2xl font-bold mt-2">
            {latest.cpuUsage || 0}%
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-400 text-sm">Temperature</p>
          <h2 className="text-2xl font-bold mt-2">
            {latest.temperature || 0}°C
          </h2>
        </div>

      </div>

      {/* GRAPHS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="card">
          <h2 className="mb-2">Temperature</h2>
          <Chart data={data} dataKey="temperature" />
        </div>

        <div className="card">
          <h2 className="mb-2">CPU Usage</h2>
          <Chart data={data} dataKey="cpuUsage" />
        </div>

      </div>

      {/* ACTION PANEL */}
      <div className="card">
        <h2 className="mb-4">Control Panel</h2>

        <div className="flex gap-3">
          <button className="btn">Restart Node</button>
          <button className="btn-outline">Boost CPU</button>
          <button className="btn-outline">Fetch Status</button>
        </div>
      </div>

    </div>
  );
}