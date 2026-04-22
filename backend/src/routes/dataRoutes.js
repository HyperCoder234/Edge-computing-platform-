const express = require("express");
const router = express.Router();

const { getAllData, createData } = require("../controllers/dataController");

router.get("/", getAllData);
router.post("/", createData); // 🔥 ab ye function hoga

module.exports = router;