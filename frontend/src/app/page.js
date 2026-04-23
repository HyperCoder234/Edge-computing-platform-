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
    <div className="p-6">

      {/* HEADER */}
      <div className="header flex justify-between items-center mb-6">
        <h1 className="text-sm tracking-widest text-gray-400 uppercase">
          Edge Control Panel
        </h1>
        <span className="text-green-400 text-xs">● LIVE</span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-4">

        {/* LEFT */}
        <div className="space-y-4">
          <Dial title="CPU" value={latest.cpuUsage || 0} unit="%" />
          <Dial title="TEMP" value={latest.temperature || 0} unit="°C" />
        </div>

        {/* CENTER */}
        <div className="panel">

          <p className="label">SYSTEM</p>

          <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
            <Block label="NODE" value={latest.nodeId || "--"} />
            <Block label="CPU" value={`${latest.cpuUsage || 0}%`} />
            <Block label="TEMP" value={`${latest.temperature || 0}°C`} />
            <Block label="STATUS" value="RUNNING" />
          </div>

          <div className="flex gap-2 mt-5">
            <button className="btn-primary">START</button>
            <button className="btn-secondary">STOP</button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="panel">

          <p className="label">LOGS</p>

          <div className="text-xs text-green-400 mt-3 space-y-1 max-h-64 overflow-y-auto font-mono">
            {data.slice(0, 10).map((item) => (
              <div key={item._id}>
                [{new Date(item.createdAt).toLocaleTimeString()}] → CPU{" "}
                {item.cpuUsage}%
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

/* 🔥 DIAL COMPONENT */
function Dial({ title, value, unit }) {
  const angle = (value / 100) * 180;

  return (
    <div className="panel text-center">

      <p className="label mb-2">{title}</p>

      <div className="relative w-40 h-20 mx-auto">

        {/* base arc */}
        <div className="absolute w-full h-full border-t-4 border-gray-700 rounded-t-full"></div>

        {/* active arc */}
        <div
          className="absolute w-full h-full border-t-4 border-green-400 rounded-t-full"
          style={{
            clipPath: `inset(0 ${100 - value}% 0 0)`,
          }}
        ></div>

        {/* needle */}
        <div
          className="absolute bottom-0 left-1/2 w-[2px] h-20 bg-red-500 origin-bottom"
          style={{ transform: `rotate(${angle - 90}deg)` }}
        ></div>

      </div>

      <h2 className="value mt-2">
        {value}
        {unit}
      </h2>

    </div>
  );
}

/* BLOCK */
function Block({ label, value }) {
  return (
    <div className="block">
      <p className="text-gray-400 text-[10px]">{label}</p>
      <p>{value}</p>
    </div>
  );
}