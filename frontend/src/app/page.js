"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Chart from "../components/Chart";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let timeout;

    const loop = async () => {
      try {
        const res = (await fetchData()) || [];

        const sorted = Array.isArray(res)
          ? res.sort(
              (a, b) =>
                new Date(b?.createdAt || 0) -
                new Date(a?.createdAt || 0)
            )
          : [];

        if (isMounted) {
          // 🔥 increase data for better graphs
          setData(sorted.slice(0, 50));
        }
      } catch (err) {
        console.error(err);
      }

      timeout = setTimeout(loop, 2000);
    };

    loop();

    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const latest = data[0] || {};
  const activeNodes = new Set(data.map((d) => d?.nodeId)).size;

  // 🔥 GROUP DATA BY NODE
  const groupedData = data.reduce((acc, item) => {
    if (!item?.nodeId) return acc;

    if (!acc[item.nodeId]) acc[item.nodeId] = [];
    acc[item.nodeId].push(item);

    return acc;
  }, {});

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-strong text-xl font-semibold">
            Overview
          </h2>
          <p className="text-muted text-sm">
            Real-time metrics
          </p>
        </div>

        <div className="flex gap-2">
          <button className="btn">Deploy</button>
          <button className="btn-outline">Logs</button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-muted">Active Nodes</p>
          <h2 className="text-strong text-2xl font-bold">
            {activeNodes}
          </h2>
        </div>

        <div className="card">
          <p className="text-muted">CPU Usage</p>
          <h2 className="text-strong text-2xl font-bold">
            {latest?.cpuUsage || 0}%
          </h2>
        </div>

        <div className="card">
          <p className="text-muted">Temperature</p>
          <h2 className="text-strong text-2xl font-bold">
            {latest?.temperature || 0}°C
          </h2>
        </div>
      </div>

      {/* GLOBAL GRAPHS (UNCHANGED) */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-strong mb-2">Temperature</h3>
          <Chart data={data || []} dataKey="temperature" color="#38bdf8" />
        </div>

        <div className="card">
          <h3 className="text-strong mb-2">CPU</h3>
          <Chart data={data || []} dataKey="cpuUsage" color="#22c55e" />
        </div>
      </div>

      {/* 🔥 NODE-WISE CHARTS */}
      <div className="space-y-4">
        <h3 className="text-strong text-lg font-semibold">
          Node-wise Performance
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(groupedData).map(([nodeId, nodeData]) => {
            const sortedData = [...nodeData].reverse();

            return (
              <div key={nodeId} className="card">
                <h4 className="text-strong mb-2">{nodeId}</h4>

                <Chart
                  data={sortedData}
                  dataKey="cpuUsage"
                  color="#22c55e"
                />

                <Chart
                  data={sortedData}
                  dataKey="temperature"
                  color="#38bdf8"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* NODE DATA */}
      <div className="card">
        <h3 className="text-strong mb-3">Node Data</h3>

        <div className="grid md:grid-cols-3 gap-3">
          {data.map((item, i) => (
            <div
              key={item?._id || i}
              className="bg-black/60 border border-white/20 p-3 rounded-lg"
            >
              <p className="text-muted text-xs">
                {item?.nodeId || "Unknown"}
              </p>

              <p className="text-strong text-sm">
                CPU: {item?.cpuUsage || 0}%
              </p>

              <p className="text-strong text-sm">
                Temp: {item?.temperature || 0}°C
              </p>

              <p className="text-gray-400 text-xs">
                {item?.createdAt
                  ? new Date(item.createdAt).toLocaleTimeString()
                  : "--"}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}