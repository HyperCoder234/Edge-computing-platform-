"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data, dataKey, color }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "8px",
            padding: "0.75rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem", margin: 0 }}>
            {new Date(label).toLocaleTimeString()}
          </p>
          <p
            style={{
              color: color || "var(--primary)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              margin: "0.25rem 0 0 0",
            }}
          >
            {payload[0].value}{dataKey === "cpuUsage" ? "%" : "°C"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <XAxis
          dataKey="createdAt"
          tickFormatter={(time) =>
            new Date(time).toLocaleTimeString()
          }
          stroke="var(--text-muted)"
          style={{ fontSize: "0.75rem" }}
          axisLine={{ stroke: "var(--border)" }}
        />
        <YAxis
          stroke="var(--text-muted)"
          style={{ fontSize: "0.75rem" }}
          axisLine={{ stroke: "var(--border)" }}
        />
        <Tooltip
          labelFormatter={(label) =>
            new Date(label).toLocaleTimeString()
          }
          content={<CustomTooltip />}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}