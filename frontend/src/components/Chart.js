"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Chart({ data = [], dataKey, color = "#22c55e" }) {

  // 🔥 FIX 1: map data to REAL CURRENT TIME
  const formattedData = [...data]
    .slice(-20) // last 20 points
    .map((item) => ({
      ...item,
      // 👇 force realtime based on arrival
      localTime: Date.now(),
    }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={formattedData}>

        <CartesianGrid
          stroke="rgba(255,255,255,0.05)"
          strokeDasharray="3 3"
        />

        {/* 🔥 REALTIME X-AXIS */}
        <XAxis
          dataKey="localTime"
          stroke="#aaa"
          fontSize={11}
          tickFormatter={(time) =>
            new Date(time).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true, // 👈 12 HOUR FORMAT
            })
          }
        />

        <YAxis stroke="#aaa" fontSize={11} />

        {/* TOOLTIP */}
        <Tooltip
          contentStyle={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
          labelFormatter={(time) =>
            new Date(time).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true, // 👈 12H FORMAT
            })
          }
        />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}