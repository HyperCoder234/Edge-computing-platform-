const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "offline",
    },
  },
  { timestamps: true }
);

// ✅ YE LINE SABSE IMPORTANT HAI
module.exports = mongoose.model("Node", nodeSchema);