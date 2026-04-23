require("dotenv").config({ path: "./.env" });

// Core imports
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Route imports
const nodeRoutes = require("./routes/nodeRoutes");
const dataRoutes = require("./routes/dataRoutes");

// Middleware imports
const errorHandler = require("./middlewares/errorHandler");

// DB
const connectDB = require("./config/db");

// MQTT
const initMQTT = require("./services/mqttService");

// App init
const app = express();
const server = http.createServer(app);

// ===== CONNECT DATABASE FIRST =====
connectDB();

// ===== START MQTT (CLOUD ENABLED) =====
initMQTT();

// ===== GLOBAL MIDDLEWARE =====
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ===== HEALTH CHECK =====
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running 🚀",
    timestamp: new Date(),
  });
});

// ===== ROUTES =====
app.use("/api/nodes", nodeRoutes);
app.use("/api/data", dataRoutes);

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ===== GRACEFUL SHUTDOWN =====
process.on("SIGINT", () => {
  console.log("🛑 Shutting down server...");
  server.close(() => {
    console.log("💀 Server closed");
    process.exit(0);
  });
});