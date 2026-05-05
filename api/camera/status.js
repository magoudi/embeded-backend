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
      return res.status(200).json({
        hasImage: false,
        latestImageUrl: null,
        latestImageTime: null,
        size: null,
      });
    }

    const latestBlob = blobs[0];

    return res.status(200).json({
      hasImage: true,
      latestImageUrl: latestBlob.url,
      latestImageTime: latestBlob.uploadedAt || null,
      size: latestBlob.size || null,
      pathname: latestBlob.pathname,
    });
  } catch (error) {
    console.error("Camera status error:", error);

    return res.status(500).json({
      hasImage: false,
      error: error.message,
    });
  }
}
