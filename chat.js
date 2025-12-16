const ws = new WebSocket("ws://localhost:8080");

const messagesDiv = document.getElementById("messages");
const msgInput = document.getElementById("msg");

// استقبال الرسائل
ws.onmessage = (event) => {
  displayMessage(event.data, false);
};

// دالة عرض الرسائل
function displayMessage(text, isOwn) {
  if (!text.trim()) return; // تجاهل الرسائل الفارغة

  const p = document.createElement("p");
  const now = new Date();
  const time = now.toLocaleTimeString();

  p.innerText = `[${time}] ${text}`;
  p.className = isOwn ? "own-message" : "other-message";
  messagesDiv.appendChild(p);

  // Scroll تلقائي
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // حد أقصى 50 رسالة
  if (messagesDiv.children.length > 50) {
    messagesDiv.removeChild(messagesDiv.children[0]);
  }
}

// إرسال الرسائل
function sendMessage() {
  const message = msgInput.value;
  if (!message.trim()) {
    alert("Message cannot be empty!");
    return;
  }

  ws.send(message);
  displayMessage(message, true);
  msgInput.value = "";
}

// إرسال بالضغط على Enter
msgInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// تسجيل الخروج
function logout() {
  sessionStorage.removeItem("token");
  alert("You have been logged out. Bye!");
  window.location.href = "index.html";
}
