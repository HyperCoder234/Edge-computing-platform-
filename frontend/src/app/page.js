"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Chart from "../components/Chart";
import Navbar from "../components/Navbar";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetchData();

      // ✅ sort latest → first
      const sorted = res.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // ✅ keep only latest 20
      setData(sorted.slice(0, 20));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ now correct latest item
  const latest = data[0] || {};

  return (
    <div>
      <Navbar />

      <div className="p-6 space-y-6">

        {/* 🔥 Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Temperature", value: `${latest.temperature || "--"}°C`, color: "from-blue-500 to-cyan-400" },
            { label: "CPU Usage", value: `${latest.cpuUsage || "--"}%`, color: "from-green-500 to-emerald-400" },
            { label: "Node", value: latest.nodeId || "--", color: "from-purple-500 to-pink-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <p className="text-gray-400 text-sm">{item.label}</p>
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* 📈 Charts */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl">
            <Chart data={data} dataKey="temperature" color="#3b82f6" />
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl">
            <Chart data={data} dataKey="cpuUsage" color="#22c55e" />
          </div>
        </div>

        {/* 📦 Data Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl hover:shadow-xl hover:scale-[1.03] transition duration-300"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-400">
                {item.nodeId}
              </h2>

              <p className="text-gray-300">
                🌡 <span className="text-blue-400">{item.temperature}°C</span>
              </p>

              <p className="text-gray-300">
                🖥 <span className="text-green-400">{item.cpuUsage}%</span>
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {new Date(item.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}