const mqtt = require("mqtt");

const client = mqtt.connect(
  "mqtts://b5a36afb310e4b2dad7eae452e4de800.s1.eu.hivemq.cloud:8883",
  {
    username: "Himanshu",
    password: "Himanshu123@#",
  }
);

client.on("connect", () => {
  console.log("🟢 Edge Node Connected");

  // 🔥 subscribe to control topic
  client.subscribe("edge/control");
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());

  console.log("📥 Command received:", data);

  if (data.action === "restart") {
    console.log("🔄 Restarting node...");
  }

  if (data.action === "status") {
    const response = {
      nodeId: data.nodeId,
      status: "running",
      time: new Date(),
    };

    // 🔥 send response back
    client.publish("edge/response", JSON.stringify(response));

    console.log("📤 Response sent:", response);
  }
});