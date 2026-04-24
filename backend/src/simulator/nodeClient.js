require("dotenv").config();
const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_URL, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

const nodeId = process.argv[2] || "node-1";

client.on("connect", () => {
  console.log(`✅ ${nodeId} connected`);

  setInterval(() => {
    const payload = {
      nodeId: nodeId, // 👈 MOST IMPORTANT LINE
      cpuUsage: Math.floor(Math.random() * 100),
      temperature: Math.floor(Math.random() * 80),
      createdAt: new Date(),
    };

    console.log("📤 Sending:", payload);

    client.publish("edge/data", JSON.stringify(payload));
  }, 2000);
});