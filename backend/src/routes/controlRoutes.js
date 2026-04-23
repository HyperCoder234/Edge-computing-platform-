const express = require("express");
const router = express.Router();
const mqtt = require("../config/mqtt");

router.post("/", async (req, res) => {
  try {
    const { nodeId, action } = req.body;

    const payload = {
      nodeId,
      action,
      timestamp: new Date(),
    };

    mqtt.publish("edge/control", JSON.stringify(payload));

    res.json({
      success: true,
      message: "Command sent 🚀",
      payload,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;