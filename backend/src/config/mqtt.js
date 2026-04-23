const mqtt = require("mqtt");

// fallback values (agar ENV missing ho toh)
const MQTT_URL =
  process.env.MQTT_URL ||
  "mqtts://b5a36afb310e4b2dad7eae452e4de800.s1.eu.hivemq.cloud:8883";

const MQTT_USER = process.env.MQTT_USER || "Himanshu";
const MQTT_PASS = process.env.MQTT_PASS || "Himanshu123@#";

const client = mqtt.connect(MQTT_URL, {
  username: MQTT_USER,
  password: MQTT_PASS,
  reconnectPeriod: 5000,
  connectTimeout: 30 * 1000,
  clean: true,
});

client.on("connect", () => {
  console.log("📡 MQTT Connected (Cloud)");
});

client.on("reconnect", () => {
  console.log("🔄 MQTT Reconnecting...");
});

client.on("error", (err) => {
  console.error("❌ MQTT Error:", err.message);
});

client.on("close", () => {
  console.log("⚠️ MQTT Connection Closed");
});

module.exports = client;