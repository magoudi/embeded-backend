const express = require("express");
const app = express();

app.use(express.json());

let latestCommand = null;

// React Native app sends command here
app.post("/command", (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: "Missing command" });
  }

  latestCommand = command;
  console.log("New command:", command);

  res.json({
    success: true,
    command,
  });
});

// ESP-01/Tiva asks backend for latest command
app.get("/command", (req, res) => {
  if (latestCommand) {
    const cmd = latestCommand;
    latestCommand = null; // clear after ESP receives it

    return res.json({
      command: cmd,
    });
  }
  console.log("asked");
  res.json({
    command: null,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
