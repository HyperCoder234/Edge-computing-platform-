require("dotenv").config();
const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_URL, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

// 👉 CLI se nodeId milega
const nodeId = process.argv[2] || "node-1";

// 👉 har node ka alag behavior
const patterns = {
  "node-1": { baseCpu: 20, baseTemp: 35 },
  "node-2": { baseCpu: 40, baseTemp: 45 },
  "node-3": { baseCpu: 60, baseTemp: 55 },
  "node-4": { baseCpu: 75, baseTemp: 65 },
  "node-5": { baseCpu: 90, baseTemp: 70 },
};

client.on("connect", () => {
  console.log(`✅ ${nodeId} connected`);

  setInterval(() => {
    const base = patterns[nodeId] || { baseCpu: 30, baseTemp: 40 };

    const payload = {
      nodeId,
      cpuUsage: Math.min(100, Math.floor(base.baseCpu + Math.random() * 20)),
      temperature: Math.floor(base.baseTemp + Math.random() * 10),
      memory: `${Math.floor(Math.random() * 16)}GB`,
      uptime: `${Math.floor(Math.random() * 24)}h`,
      createdAt: new Date(),
    };

    client.publish("edge/data", JSON.stringify(payload));

    console.log(`📤 ${nodeId}:`, payload);
  }, 2000);
});

client.on("error", (err) => {
  console.error(`❌ ${nodeId} MQTT Error:`, err.message);
});