"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";

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

  // 🔥 dynamic values
  const activeNodes = new Set(data.map((d) => d.nodeId)).size;

  const avgCpu =
    data.reduce((acc, d) => acc + (d.cpuUsage || 0), 0) /
    (data.length || 1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* TOP STATS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-[#1a1a1a] border border-white/10 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">ACTIVE NODES</p>
          <h2 className="text-3xl font-bold mt-2">{activeNodes}</h2>
          <p className="text-gray-500 text-sm">Live connected nodes</p>
        </div>

        <div className="bg-[#1a1a1a] border border-white/10 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">NETWORK HEALTH</p>
          <h2 className="text-3xl font-bold mt-2">
            {Math.min(100, Math.round(100 - avgCpu / 2))}%
          </h2>
          <p className="text-gray-500 text-sm">
            Based on system load
          </p>
        </div>

      </div>

      {/* SYSTEM LOAD */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-[#1a1a1a] border border-white/10 p-5 rounded-xl">
          <h2 className="mb-4 text-white">System Load</h2>

          <Bar label="CPU Usage" value={latest.cpuUsage || 0} />
          <Bar label="Temperature" value={latest.temperature || 0} />
          <Bar label="Avg CPU" value={avgCpu} />
        </div>

        {/* NODE STATUS */}
        <div className="bg-[#1a1a1a] border border-white/10 p-5 rounded-xl">
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

      {/* ACTIVITY */}
      <div className="bg-[#1a1a1a] border border-white/10 p-5 rounded-xl">
        <h2 className="mb-3">Recent Activity</h2>

        {data.slice(0, 5).map((item) => (
          <div
            key={item._id}
            className="py-2 border-b border-white/10 text-gray-300"
          >
            Node {item.nodeId} → CPU {item.cpuUsage}% | Temp{" "}
            {item.temperature}°C
          </div>
        ))}
      </div>

    </div>
  );
}

/* 🔥 BAR COMPONENT */
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