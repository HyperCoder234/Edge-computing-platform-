"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Chart from "../components/Chart";
import Topbar from "../components/Topbar";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchLoop = async () => {
      try {
        const res = await fetchData();

        const sorted = res.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

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

  return (
    <div className="max-w-7xl mx-auto text-white">

      <Topbar />

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-400">Temperature</p>
          <h2 className="text-2xl font-bold text-blue-400">
            {latest.temperature || "--"}°C
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-400">CPU Usage</p>
          <h2 className="text-2xl font-bold text-green-400">
            {latest.cpuUsage || "--"}%
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-400">Node</p>
          <h2 className="text-2xl font-bold text-purple-400">
            {latest.nodeId || "--"}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <h2 className="text-white mb-2">Temperature Trend</h2>
          <Chart data={data} dataKey="temperature" color="#3b82f6" />
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <h2 className="text-white mb-2">CPU Usage Trend</h2>
          <Chart data={data} dataKey="cpuUsage" color="#22c55e" />
        </div>
      </div>

      {/* Data Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white/5 border border-white/10 p-4 rounded-2xl"
          >
            <h2 className="text-blue-400 font-semibold mb-2">
              {item.nodeId}
            </h2>

            <p className="text-white">🌡 {item.temperature}°C</p>
            <p className="text-white">🖥 {item.cpuUsage}%</p>

            <p className="text-gray-500 text-sm mt-2">
              {new Date(item.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}