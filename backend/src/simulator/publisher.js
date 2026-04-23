const mqtt = require("mqtt");

const client = mqtt.connect(
  "mqtts://b5a36afb310e4b2dad7eae452e4de800.s1.eu.hivemq.cloud:8883",
  {
    username: "Himanshu",
    password: "Himanshu123@#",
  }
);

client.on("connect", () => {
  console.log("📡 Publisher connected");

  setInterval(() => {
    const data = {
      nodeId: "node-1",
      temperature: Math.floor(Math.random() * 100),
      cpuUsage: Math.floor(Math.random() * 100),
    };

    client.publish("edge/data", JSON.stringify(data));
    console.log("📤 Sent:", data);
  }, 2000);
});