"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loop = async () => {
      const res = (await fetchData()) || [];

      const sorted = Array.isArray(res)
        ? res.sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [];

      setData(sorted.slice(0, 20));

      setTimeout(loop, 2000);
    };

    loop();
  }, []);

  const latest = data[0] || {};

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center border-b border-white/10 pb-4">
        <h1 className="text-lg tracking-widest uppercase text-gray-400">
          Edge Control Panel
        </h1>
        <span className="text-green-400 text-sm">● Live</span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-3 gap-4">

        {/* LEFT PANEL */}
        <div className="space-y-4">

          <Gauge title="CPU USAGE" value={latest.cpuUsage || 0} />

          <Gauge title="TEMPERATURE" value={latest.temperature || 0} />

        </div>

        {/* CENTER PANEL */}
        <div className="bg-[#111] border border-white/10 p-4 rounded-lg flex flex-col justify-between">

          <h2 className="text-sm text-gray-400 mb-2">
            SYSTEM INFO
          </h2>

          <div className="space-y-2 text-sm">
            <Info label="Node ID" value={latest.nodeId || "--"} />
            <Info label="CPU" value={`${latest.cpuUsage || 0}%`} />
            <Info label="Temp" value={`${latest.temperature || 0}°C`} />
          </div>

          <div className="mt-4 flex gap-2">
            <button className="btn">Restart</button>
            <button className="btn-outline">Boost</button>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-[#111] border border-white/10 p-4 rounded-lg">

          <h2 className="text-sm text-gray-400 mb-2">
            LIVE LOGS
          </h2>

          <div className="space-y-2 text-xs text-gray-300 max-h-64 overflow-y-auto">
            {data.slice(0, 10).map((item) => (
              <div key={item._id}>
                [{new Date(item.createdAt).toLocaleTimeString()}] Node{" "}
                {item.nodeId} → CPU {item.cpuUsage}%
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

/* 🔥 GAUGE COMPONENT */
function Gauge({ title, value }) {
  return (
    <div className="bg-[#111] border border-white/10 p-4 rounded-lg">

      <p className="text-xs text-gray-400 mb-2">{title}</p>

      <div className="relative w-full h-24 flex items-center justify-center">

        <div className="absolute w-20 h-20 rounded-full border-4 border-white/10"></div>

        <div
          className="absolute w-20 h-20 rounded-full border-4 border-green-400"
          style={{
            clipPath: `inset(${100 - value}% 0 0 0)`,
          }}
        ></div>

        <span className="text-lg font-bold">{value}%</span>

      </div>
    </div>
  );
}

/* INFO ROW */
function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-1">
      <span className="text-gray-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}