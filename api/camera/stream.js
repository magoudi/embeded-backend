import { addClient, removeClient, getLatestFrame } from "./store.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.writeHead(200, {
    "Content-Type": "multipart/x-mixed-replace; boundary=frame",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  addClient(res);

  const latestFrame = getLatestFrame();

  if (latestFrame) {
    res.write("--frame\r\n");
    res.write("Content-Type: image/jpeg\r\n");
    res.write(`Content-Length: ${latestFrame.length}\r\n\r\n`);
    res.write(latestFrame);
    res.write("\r\n");
  }

  req.on("close", () => {
    removeClient(res);
  });
}
