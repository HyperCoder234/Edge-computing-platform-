const client = require("../config/mqtt");
const Data = require("../models/Data");

const initMQTT = () => {
  client.on("connect", () => {
    console.log("📡 MQTT Connected");

    client.subscribe("edge/data");
    client.subscribe("edge/response");
  });

  client.on("message", async (topic, message) => {
    try {
      const data = JSON.parse(message.toString());

      // 🔥 DEBUG (IMPORTANT)
      console.log("📥 RAW:", data);

      if (topic === "edge/data") {
        // ❌ reject bad data
        if (!data.nodeId) {
          console.log("❌ Missing nodeId, skipping:", data);
          return;
        }

        // ✅ FORCE CLEAN OBJECT
        const cleanData = {
          nodeId: String(data.nodeId),
          cpuUsage: Number(data.cpuUsage) || 0,
          temperature: Number(data.temperature) || 0,
          memory: data.memory || "--",
          uptime: data.uptime || "--",
          createdAt: new Date(),
        };

        console.log("✅ Saving:", cleanData);

        await Data.create(cleanData);
      }

      if (topic === "edge/response") {
        console.log("📨 Node Response:", data);
      }

    } catch (error) {
      console.error("MQTT error:", error.message);
    }
  });
};

module.exports = initMQTT;