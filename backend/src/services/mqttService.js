const client = require("../config/mqtt");
const Data = require("../models/Data");

const initMQTT = () => {
  client.on("connect", () => {
    console.log("📡 MQTT Connected");

    // existing
    client.subscribe("edge/data");
    
    // 🔥 NEW
    client.subscribe("edge/response");
  });

  client.on("message", async (topic, message) => {
    try {
      const data = JSON.parse(message.toString());

      // 📊 Data storage (existing)
      if (topic === "edge/data") {
        console.log("📥 Data received:", data);
        await Data.create(data);
      }

      // 🎯 NEW: response handling
      if (topic === "edge/response") {
        console.log("📨 Node Response:", data);
      }

    } catch (error) {
      console.error("MQTT error:", error.message);
    }
  });
};

module.exports = initMQTT;