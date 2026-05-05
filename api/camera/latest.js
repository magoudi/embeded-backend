import { list } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { blobs } = await list({
      prefix: "camera/latest.jpg",
      limit: 1,
    });

    if (!blobs || blobs.length === 0) {
      return res.status(404).send("No image uploaded yet");
    }

    const latestBlob = blobs[0];

    res.setHeader("Cache-Control", "no-store");

    return res.redirect(302, `${latestBlob.url}?t=${Date.now()}`);
  } catch (error) {
    console.error("Latest image error:", error);

    return res.status(500).json({
      error: "Could not get latest image",
      details: error.message,
    });
  }
}
