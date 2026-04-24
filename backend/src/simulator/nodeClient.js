require("dotenv").config();
const mqtt = require("mqtt");

// 🔥 SAME CLOUD BROKER
const MQTT_URL =
  process.env.MQTT_URL ||
  "mqtts://b5a36afb310e4b2dad7eae452e4de800.s1.eu.hivemq.cloud:8883";

const MQTT_USER = process.env.MQTT_USER || "Himanshu";
const MQTT_PASS = process.env.MQTT_PASS || "Himanshu123@#";

const client = mqtt.connect(MQTT_URL, {
  username: MQTT_USER,
  password: MQTT_PASS,
  clean: true,
  reconnectPeriod: 5000,
  connectTimeout: 30 * 1000,
  protocolVersion: 4,
});

const nodeId = process.argv[2] || "node-1";

client.on("connect", () => {
  console.log(`🟢 ${nodeId} CONNECTED TO MQTT`);

  setInterval(() => {
    const payload = {
      nodeId,
      cpuUsage: Math.floor(Math.random() * 100),
      temperature: Math.floor(Math.random() * 80),
      createdAt: new Date(),
    };

    console.log("📤 Sending:", payload);

    // 🔥 QoS 1 publish
    client.publish("edge/data", JSON.stringify(payload), { qos: 1 });
  }, 2000);
});

client.on("error", (err) => {
  console.error("❌ MQTT Error:", err.message);
});