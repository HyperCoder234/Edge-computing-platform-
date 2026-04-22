const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    nodeId: {
      type: String,
      required: true,
    },
    temperature: Number,
    cpuUsage: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);