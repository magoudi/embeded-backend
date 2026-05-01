let latestStatus = {
  temperature: null,
  humidity: null,
  systemStatus: null,
  alert: null,
  motionDetected: false,
  updatedAt: null,
};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    latestStatus = {
      ...latestStatus,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      status: latestStatus,
    });
  }

  if (req.method === "GET") {
    return res.status(200).json(latestStatus);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
