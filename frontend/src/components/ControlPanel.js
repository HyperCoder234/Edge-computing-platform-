"use client";

import { useState } from "react";

export default function ControlPanel() {
  const [nodeId, setNodeId] = useState("node-1");
  const [action, setAction] = useState("status");
  const [response, setResponse] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await fetch(
        "https://edge-computing-platform.onrender.com/api/control",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodeId, action }),
        }
      );

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4">
      <h2 className="text-lg font-semibold text-cyan-400">
        🎮 Control Panel
      </h2>

      <input
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
        className="w-full p-2 rounded bg-black/30 border border-white/10"
        placeholder="Node ID"
      />

      <select
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="w-full p-2 rounded bg-black/30 border border-white/10"
      >
        <option value="status">Get Status</option>
        <option value="restart">Restart Node</option>
        <option value="boost">Boost CPU</option>
      </select>

      <button
        onClick={sendRequest}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 py-2 rounded-lg font-semibold"
      >
        Send Request
      </button>

      {response && (
        <div className="text-sm text-green-400">
          Response: {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
}