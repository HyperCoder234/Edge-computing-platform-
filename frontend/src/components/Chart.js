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
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="mb-2 text-lg">{dataKey.toUpperCase()} Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis
            dataKey="createdAt"
            tickFormatter={(time) =>
              new Date(time).toLocaleTimeString()
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) =>
              new Date(label).toLocaleTimeString()
            }
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}