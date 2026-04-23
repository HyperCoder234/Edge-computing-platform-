"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";

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

  // 🔥 dynamic calculations
  const activeNodes = new Set(data.map((d) => d.nodeId)).size;
  const avgCpu =
    data.reduce((acc, d) => acc + (d.cpuUsage || 0), 0) /
    (data.length || 1);

  const avgTemp =
    data.reduce((acc, d) => acc + (d.temperature || 0), 0) /
    (data.length || 1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Top Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card
          title="ACTIVE NODES"
          value={activeNodes}
          sub="Live connected nodes"
        />
        <Card
          title="NETWORK HEALTH"
          value={`${Math.min(100, Math.round(100 - avgCpu / 2))}%`}
          sub="Based on system load"
        />
      </div>

      {/* Middle Section */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Network Map */}
        <div className="card">
          <div className="flex justify-between mb-3">
            <h2>Decentralized Network Map</h2>
            <span className="badge green">Live</span>
          </div>

          <div className="flex justify-around mt-6">
            {["Gateway", "Edge Nodes", "Validators", "Storage"].map((t, i) => (
              <div key={i} className="text-center">
                <div className="circle" />
                <p className="text-sm mt-2 text-gray-400">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Load */}
        <div className="card">
          <h2 className="mb-4">System Load</h2>

          <Bar label="CPU Usage" value={Math.round(latest.cpuUsage || 0)} />
          <Bar label="Temperature" value={Math.round(latest.temperature || 0)} />
          <Bar label="Avg CPU" value={Math.round(avgCpu)} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Node Status */}
        <div className="card">
          <div className="flex justify-between mb-3">
            <h2>Node Status</h2>
            <span className="badge blue">{data.length} logs</span>
          </div>

          {[...new Set(data.map((d) => d.nodeId))].map((node, i) => {
            const latestNode = data.find((d) => d.nodeId === node);

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
                  {latestNode?.cpuUsage > 80 ? "Degraded" : "Healthy"}
                </span>
              </div>
            );
          })}

          <div className="flex gap-3 mt-4">
            <button className="btn">View All</button>
            <button className="btn">Deploy Update</button>
          </div>
        </div>

        {/* Performance */}
        <div className="card">
          <div className="flex justify-between mb-3">
            <h2>Performance Metrics</h2>
            <span className="badge green">Live</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniCard
              label="Avg Latency"
              value={`${Math.round(20 + avgCpu / 5)} ms`}
            />
            <MiniCard
              label="Throughput"
              value={`${(2 + avgCpu / 100).toFixed(2)} GB/s`}
            />
            <MiniCard label="Uptime" value="99.9%" />
            <MiniCard
              label="Consensus"
              value={`${(5 + avgCpu / 20).toFixed(1)} s`}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button className="btn">View Logs</button>
            <button className="btn">Optimize</button>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="card">
        <div className="flex justify-between mb-3">
          <h2>Recent Activity</h2>
          <span className="badge blue">Live</span>
        </div>

        {data.slice(0, 5).map((item) => (
          <div
            key={item._id}
            className="py-2 border-b border-white/10 text-gray-300"
          >
            Node {item.nodeId} reported {item.cpuUsage}% CPU &{" "}
            {item.temperature}°C
          </div>
        ))}
      </div>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, value, sub }) {
  return (
    <div className="card">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-sm text-gray-500">{sub}</p>
    </div>
  );
}

function MiniCard({ label, value }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl text-center">
      <p className="text-gray-400 text-sm">{label}</p>
      <h2 className="text-lg font-semibold">{value}</h2>
    </div>
  );
}

function Bar({ label, value }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}