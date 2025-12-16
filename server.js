const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("✅ Server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("🟢 New client connected");

  ws.on("message", (message) => {
    console.log("📩 Received:", message.toString());

    // broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("🔴 Client disconnected");
  });
});
