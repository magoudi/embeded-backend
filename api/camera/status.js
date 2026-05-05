import { get } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const blob = await get("camera/latest.jpg");

    return res.status(200).json({
      hasImage: !!blob?.url,
      latestImageUrl: blob?.url || null,
      latestImageTime: blob?.uploadedAt || null,
      size: blob?.size || null,
    });
  } catch (error) {
    return res.status(200).json({
      hasImage: false,
      latestImageUrl: null,
      latestImageTime: null,
      size: null,
    });
  }
}
