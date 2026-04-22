const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("📡 Edge Node Connected");

  setInterval(() => {
    const data = {
      nodeId: "node-1",
      temperature: Math.floor(Math.random() * 100),
      cpuUsage: Math.floor(Math.random() * 100),
    };

    client.publish("edge/data", JSON.stringify(data));

    console.log("📤 Data sent:", data);
  }, 3000);
});