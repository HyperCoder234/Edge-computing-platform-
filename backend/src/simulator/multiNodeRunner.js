const { spawn } = require("child_process");

const nodes = ["node-1", "node-2", "node-3", "node-4", "node-5"];

nodes.forEach((nodeId) => {
  spawn("node", ["nodeClient.js", nodeId], {
    stdio: "inherit",
    shell: true,
  });
});