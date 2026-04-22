const express = require("express");
const router = express.Router();

// ✅ YE LINE IMPORTANT HAI
const { createNode, getAllNodes } = require("../controllers/nodeController");

router.get("/", getAllNodes);
router.post("/", createNode);

module.exports = router;