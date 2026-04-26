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
  // 🔥 SORT DATA (oldest → newest for correct time flow)
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

        {/* 🔥 TIME AXIS FIX */}
        <XAxis
          dataKey="createdAt"
          tickFormatter={(time) =>
            new Date(time).toLocaleTimeString([], {
              minute: "2-digit",
              second: "2-digit",
            })
          }
          stroke="#71717a"
          fontSize={11}
        />

        <YAxis
          stroke="#71717a"
          fontSize={11}
        />

        {/* TOOLTIP */}
        <Tooltip
          contentStyle={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
          labelFormatter={(time) =>
            new Date(time).toLocaleTimeString()
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