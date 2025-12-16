const WebSocket = require("ws");

// إنشاء WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  console.log("New user connected");
  console.log("Online users: " + clients.length);

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(client => client !== ws);
    console.log("User disconnected");
    console.log("Online users: " + clients.length);
  });
});

console.log("✅ Server running on ws://localhost:8080");
