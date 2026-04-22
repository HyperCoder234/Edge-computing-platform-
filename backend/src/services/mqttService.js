const client = require("../config/mqtt");
const mongoose = require("mongoose");

// ⚠️ SAFE MODEL LOAD (important fix)
const Data =
  mongoose.models.Data || require("../models/Data");

const initMQTT = () => {
  // connect event
  client.on("connect", () => {
    console.log("📡 MQTT Connected");

    client.subscribe("edge/data", (err) => {
      if (!err) {
        console.log("📡 Subscribed to edge/data");
      } else {
        console.error("❌ Subscribe error:", err.message);
      }
    });
  });

  // message event
  client.on("message", async (topic, message) => {
    try {
      const data = JSON.parse(message.toString());

      console.log("📥 Data received:", data);

      // 🔥 force clean object (avoid hidden issues)
      const payload = {
        nodeId: data.nodeId,
        temperature: Number(data.temperature),
        cpuUsage: Number(data.cpuUsage),
      };

      const saved = await Data.create(payload);

      console.log("💾 SAVED:", saved);
    } catch (error) {
      console.error("❌ FULL ERROR:", error);
    }
  });
};

module.exports = initMQTT;