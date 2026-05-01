let latestCommand = null;

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { command } = req.body;

    if (!command) {
      return res.status(400).json({ error: "Missing command" });
    }

    latestCommand = command;

    return res.status(200).json({
      success: true,
      command,
    });
  }

  if (req.method === "GET") {
    const cmd = latestCommand;
    latestCommand = null;

    return res.status(200).json({
      command: cmd,
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
