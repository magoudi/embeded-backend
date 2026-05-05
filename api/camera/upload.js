import { setLatestFrame, broadcastFrame, getLatestFrameTime } from "./store.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = await readRawBody(req);

    if (!body || body.length === 0) {
      return res.status(400).json({ error: "No frame received" });
    }

    const latestFrame = Buffer.from(body);

    setLatestFrame(latestFrame);
    broadcastFrame(latestFrame);

    return res.status(200).json({
      success: true,
      size: latestFrame.length,
      time: getLatestFrameTime(),
    });
  } catch (error) {
    console.error("Camera upload error:", error);

    return res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
}
