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
  // 🔥 FIX 1: Ensure correct order (old → new)
  const formattedData = [...data]
    .filter((d) => d?.createdAt)
    .sort(
      (a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
    );

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={formattedData}>

        {/* GRID */}
        <CartesianGrid
          stroke="rgba(255,255,255,0.05)"
          strokeDasharray="3 3"
        />

        {/* 🔥 FIX 2: TIME ZONE CORRECT */}
        <XAxis
          dataKey="createdAt"
          stroke="#71717a"
          fontSize={11}
          tickFormatter={(time) =>
            new Date(time).toLocaleTimeString("en-IN", {
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
              timeZone: "Asia/Kolkata",
            })
          }
        />

        <YAxis
          stroke="#71717a"
          fontSize={11}
        />

        {/* 🔥 FIX 3: TOOLTIP TIME MATCH */}
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
              hour12: false,
              timeZone: "Asia/Kolkata",
            })
          }
        />

        {/* LINE */}
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