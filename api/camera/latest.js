import { getLatestFrame } from "./store.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const frame = getLatestFrame();

  if (!frame) {
    return res.status(404).send("No frame yet");
  }

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Cache-Control", "no-store");

  return res.status(200).send(frame);
}
