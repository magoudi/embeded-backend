import { get } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const blob = await get("camera/latest.jpg");

    if (!blob || !blob.url) {
      return res.status(404).send("No image uploaded yet");
    }

    res.setHeader("Cache-Control", "no-store");

    return res.redirect(302, `${blob.url}?t=${Date.now()}`);
  } catch (error) {
    console.error("Latest image error:", error);

    return res.status(404).send("No image uploaded yet");
  }
}
