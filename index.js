const express = require("express");
const app = express();

app.use(express.json());

let latestCommand = null;
let latestStatus = {
  temperature: null,
  humidity: null,
};

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/command", (req, res) => {
  const { command } = req.body;
  latestCommand = command;
  res.json({ success: true, command });
});

app.get("/command", (req, res) => {
  const cmd = latestCommand;
  latestCommand = null;
  res.json({ command: cmd });
});

app.post("/status", (req, res) => {
  latestStatus = {
    ...latestStatus,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    status: latestStatus,
  });
});

app.get("/status", (req, res) => {
  res.json(latestStatus);
});

module.exports = app;
