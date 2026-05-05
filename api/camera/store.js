export let latestFrame = null;
export let latestFrameTime = null;
export let clients = [];

export function setLatestFrame(buffer) {
  latestFrame = buffer;
  latestFrameTime = new Date().toISOString();
}

export function getLatestFrame() {
  return latestFrame;
}

export function getLatestFrameTime() {
  return latestFrameTime;
}

export function addClient(res) {
  clients.push(res);
}

export function removeClient(res) {
  clients = clients.filter((client) => client !== res);
}

export function broadcastFrame(frameBuffer) {
  clients.forEach((client) => {
    try {
      client.write("--frame\r\n");
      client.write("Content-Type: image/jpeg\r\n");
      client.write(`Content-Length: ${frameBuffer.length}\r\n\r\n`);
      client.write(frameBuffer);
      client.write("\r\n");
    } catch (error) {
      console.log("Client write error:", error.message);
    }
  });
}
