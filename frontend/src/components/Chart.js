"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale,
} from "chart.js";

import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale
);

export default function Chart({ data = [], dataKey, color = "#22c55e" }) {
  // 🔥 CLEAN + SORT + LIMIT
  const formattedData = [...data]
    .filter((d) => d?.createdAt && d?.[dataKey] !== undefined)
    .sort(
      (a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
    )
    .slice(-20);

  const chartData = {
    labels: formattedData.map((d) => d.createdAt),
    datasets: [
      {
        label: dataKey,
        data: formattedData.map((d) => d[dataKey]),
        borderColor: color,
        backgroundColor: color,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        type: "time", // 🔥 IMPORTANT
        time: {
          unit: "minute",
          tooltipFormat: "hh:mm:ss a", // 12h format
        },
        ticks: {
          maxTicksLimit: 6, // 🔥 FIX spacing
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },

      y: {
        ticks: {
          color: "#aaa",
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.parsed.y}`,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}