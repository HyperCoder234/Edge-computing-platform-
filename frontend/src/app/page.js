"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLoop = async () => {
      try {
        const res = await fetchData();
        setData(res.slice(0, 20));
      } catch (err) {
        console.error(err);
      }

      setTimeout(fetchLoop, 2000);
    };

    fetchLoop();
  }, []);

  const latest = data[0] || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Top Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="ACTIVE NODES" value="247" sub="+12 new this week" />
        <Card title="NETWORK HEALTH" value="98.7%" sub="All systems operational" />
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

          <Bar label="CPU Usage" value={latest.cpuUsage || 64} />
          <Bar label="Memory Usage" value={42} />
          <Bar label="Bandwidth" value={78} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Node Status */}
        <div className="card">
          <div className="flex justify-between mb-3">
            <h2>Node Status</h2>
            <span className="badge blue">12 alerts</span>
          </div>

          {["Edge-US-001", "Edge-EU-042", "Edge-AP-015", "Edge-CN-008"].map((n, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-white/10">
              <span>{n}</span>
              <span className="text-green-400">Healthy</span>
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <button className="btn">View All</button>
            <button className="btn">Deploy Update</button>
          </div>
        </div>

        {/* Performance */}
        <div className="card">
          <div className="flex justify-between mb-3">
            <h2>Performance Metrics</h2>
            <span className="badge green">Optimized</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniCard label="Avg Latency" value="24ms" />
            <MiniCard label="Throughput" value="2.4GB/s" />
            <MiniCard label="Uptime" value="99.98%" />
            <MiniCard label="Consensus" value="8.2s" />
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
          <span className="badge blue">Last 24 hours</span>
        </div>

        {[
          "Network rebalance completed",
          "3 new nodes joined network",
          "Protocol upgrade deployed",
          "Storage replication synchronized"
        ].map((t, i) => (
          <div key={i} className="py-2 border-b border-white/10 text-gray-300">
            {t}
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