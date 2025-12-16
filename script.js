const ws = new WebSocket("ws://localhost:8080");
const chat = document.getElementById("chat");

// استقبال الرسائل
ws.onmessage = (event) => {
  const msg = document.createElement("div");
  msg.textContent = event.data;
  chat.appendChild(msg);
};

// إرسال رسالة
function sendMessage() {
  const user = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  if (!user || !message) return;

  const time = new Date().toLocaleTimeString();
  ws.send(`[${time}] ${user}: ${message}`);
  document.getElementById("message").value = "";
}

// إرسال رسالة بالضغط على Enter
document.getElementById("message").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
