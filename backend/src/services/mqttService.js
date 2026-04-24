const client = require("../config/mqtt");
const Data = require("../models/Data");

const initMQTT = () => {
  client.on("connect", () => {
    console.log("📡 MQTT Connected (Cloud)");

    // 🔥 QoS 1 for reliability
    client.subscribe("edge/data", { qos: 1 });
    client.subscribe("edge/response", { qos: 1 });
  });

  client.on("message", async (topic, message) => {
    try {
      const raw = message.toString();
      console.log("📥 GOT MESSAGE:", topic, raw);

      const data = JSON.parse(raw);

      if (topic === "edge/data") {
        if (!data.nodeId) {
          console.log("❌ Missing nodeId, skipping:", data);
          return;
        }

        const cleanData = {
          nodeId: String(data.nodeId),
          cpuUsage: Number(data.cpuUsage) || 0,
          temperature: Number(data.temperature) || 0,
          createdAt: new Date(),
        };

        console.log("💾 Saving:", cleanData);

        await Data.create(cleanData);
      }

      if (topic === "edge/response") {
        console.log("📨 Node Response:", data);
      }
    } catch (error) {
      console.error("❌ MQTT error:", error.message);
    }
  });
};

module.exports = initMQTT;