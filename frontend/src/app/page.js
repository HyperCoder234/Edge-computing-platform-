"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Chart from "../components/Chart";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let timeout;

    const loop = async () => {
      const res = (await fetchData()) || [];

      const sorted = Array.isArray(res)
        ? res.sort(
            (a, b) =>
              new Date(b?.createdAt || 0) -
              new Date(a?.createdAt || 0)
          )
        : [];

      setData(sorted);

      timeout = setTimeout(loop, 2000);
    };

    loop();
    return () => clearTimeout(timeout);
  }, []);

  // GROUP DATA
  const groupedData = data.reduce((acc, item) => {
    if (!item?.nodeId) return acc;
    if (!acc[item.nodeId]) acc[item.nodeId] = [];
    acc[item.nodeId].push(item);
    return acc;
  }, {});

  const nodeIds = Object.keys(groupedData);
  const latest = data[0] || {};

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black/70 border-r border-white/10 p-6">
        <h1 className="text-xl font-bold mb-6">⚡ Edge</h1>

        <nav className="space-y-3 text-gray-400">
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Nodes</div>
          <div className="nav-item">Analytics</div>
          <div className="nav-item">Logs</div>
          <div className="nav-item">Settings</div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Edge Control Panel</h1>
            <p className="text-gray-400 text-sm">
              Distributed Monitoring System
            </p>
          </div>

          <div className="flex gap-3">
            <button className="btn">Deploy</button>
            <button className="btn-outline">Logs</button>
          </div>
        </div>

        {/* GLOBAL STATS */}
        <div className="grid grid-cols-4 gap-4">
          <Stat title="Active Nodes" value={nodeIds.length} />
          <Stat title="CPU Usage" value={`${latest.cpuUsage || 0}%`} />
          <Stat title="Temperature" value={`${latest.temperature || 0}°C`} />
          <Stat title="Total Records" value={data.length} />
        </div>

        {/* GLOBAL GRAPHS */}
        <div className="grid grid-cols-2 gap-4">
          <Card title="Global CPU Trend">
            <Chart data={data} dataKey="cpuUsage" color="#22c55e" />
          </Card>

          <Card title="Global Temperature Trend">
            <Chart data={data} dataKey="temperature" color="#38bdf8" />
          </Card>
        </div>

        {/* NODE GRID */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Nodes</h2>

          <div className="grid grid-cols-2 gap-6">

            {nodeIds.map((nodeId) => {
              const nodeData = groupedData[nodeId];
              const latest = nodeData[0];

              return (
                <div key={nodeId} className="card space-y-4">

                  {/* NODE HEADER */}
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{nodeId}</h3>
                    <span className="text-green-400 text-sm">● Active</span>
                  </div>

                  {/* NODE STATS */}
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">CPU</p>
                      <p className="font-bold">{latest?.cpuUsage || 0}%</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Temp</p>
                      <p className="font-bold">{latest?.temperature || 0}°C</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Updated</p>
                      <p>
                        {latest?.createdAt
                          ? new Date(latest.createdAt).toLocaleTimeString()
                          : "--"}
                      </p>
                    </div>
                  </div>

                  {/* NODE CHARTS */}
                  <div className="grid grid-cols-2 gap-3">

                    <Chart
                      data={[...nodeData].reverse().slice(0, 20)}
                      dataKey="cpuUsage"
                      color="#22c55e"
                    />

                    <Chart
                      data={[...nodeData].reverse().slice(0, 20)}
                      dataKey="temperature"
                      color="#38bdf8"
                    />

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* TABLE VIEW */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <div className="card overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="text-left p-2">Node</th>
                  <th className="text-left p-2">CPU</th>
                  <th className="text-left p-2">Temp</th>
                  <th className="text-left p-2">Time</th>
                </tr>
              </thead>

              <tbody>
                {data.slice(0, 20).map((item, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="p-2">{item.nodeId}</td>
                    <td className="p-2">{item.cpuUsage}%</td>
                    <td className="p-2">{item.temperature}°C</td>
                    <td className="p-2">
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

/* COMPONENTS */

function Stat({ title, value }) {
  return (
    <div className="card">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">{title}</h3>
      {children}
    </div>
  );
}